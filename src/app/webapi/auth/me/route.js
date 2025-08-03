"use server";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import mysql from "mysql2/promise";
import axios from "axios";

const DISCORD_GUILD_ID = "822441666584903730";
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const poolValley = mysql.createPool({
  host: "sql10.freesqldatabase.com",
  user: "sql10793328",
  password: "EiIuwEqTMU",
  database: "sql10793328",
});

const poolCDA = mysql.createPool({
  host: "sql10.freesqldatabase.com",
  user: "root",
  password: "EiIuwEqTMU",
  database: "sql10793328",
});

const poolSite = mysql.createPool({
  host: "sql10.freesqldatabase.com",
  user: "root",
  password: "EiIuwEqTMU",
  database: "sql10793328",
});

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // Tenta pegar dados do cookie
  const cookieUserData = req.cookies.get("userData")?.value;

  if (cookieUserData) {
    // Se cookie existe, retorna os dados direto do cookie (parse JSON)
    try {
      const userData = JSON.parse(cookieUserData);
      return NextResponse.json(userData);
    } catch {
      // Se cookie estiver corrompido, ignora e prossegue para buscar do banco
    }
  }

  // Se não tem cookie, busca no banco
  const roles = {
    valley: {
      diamante: "1210779610057408532",
      ouro: "1162251534743122041",
      prata: "1162245419015864401",
      allowlist: "961366876649312336",
    },
    cda: {
      diamante: "848158314612523018",
      ouro: "848158168743804959",
      prata: "848157713031888906",
      allowlist: "845739154952552468",
    },
  };

  try {
    const [valleyAccountRows] = await poolValley.execute(
      "SELECT id FROM zn_contas WHERE discord = ?",
      [userId]
    );

    const [siteAccountRows] = await poolSite.execute(
      "SELECT accountId, email, name, date, serial, allowlist FROM site_contas WHERE discord_id = ?",
      [userId]
    );

    const [cdaAccountRows] = await poolCDA.execute(
      "SELECT id FROM zn_contas WHERE discord = ?",
      [userId]
    );

    const accountIdValley =
      valleyAccountRows.length > 0 ? valleyAccountRows[0].id : null;
    const accountIdSite =
      siteAccountRows.length > 0 ? siteAccountRows[0].accountId : null;
    const accountIdCDA =
      cdaAccountRows.length > 0 ? cdaAccountRows[0].id : null;

    const [valleyDiamantesRow] = await poolValley.execute(
      "SELECT diamantes FROM zn_diamantes WHERE discordid = ?",
      [userId]
    );

    const [cdaDiamantesRow] = await poolCDA.execute(
      "SELECT diamantes FROM zn_diamantes WHERE discordid = ?",
      [userId]
    );

    const [valleyVipRow] = await poolValley.execute(
      "SELECT data FROM zn_vips WHERE id = ?",
      [accountIdValley]
    );

    const [cdaVipRow] = await poolCDA.execute(
      "SELECT data FROM zn_vips WHERE id = ?",
      [accountIdCDA]
    );

    const discordRes = await axios.get(
      `https://discord.com/api/guilds/${DISCORD_GUILD_ID}/members/${userId}`,
      {
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        },
      }
    );

    const discordRoles = discordRes.data.roles || [];

    const resolveVIP = (rolesMap) => {
      if (discordRoles.includes(rolesMap.diamante)) return "Diamante";
      if (discordRoles.includes(rolesMap.ouro)) return "Ouro";
      if (discordRoles.includes(rolesMap.prata)) return "Prata";
      return "Nenhum";
    };

    const vipStatus = resolveVIP(roles.valley);
    const vipStatusCDA = resolveVIP(roles.cda);

    const priority = ["Diamante", "Ouro"].includes(vipStatus) ? 1 : null;
    const priorityCDA = ["Diamante", "Ouro"].includes(vipStatusCDA) ? 1 : null;

    const isAllowlist = discordRoles.includes(roles.valley.allowlist);
    const isAllowlistCDA = discordRoles.includes(roles.cda.allowlist);

    const siteData = siteAccountRows.length > 0 ? siteAccountRows[0] : {};

    const now = Math.floor(Date.now() / 1000);
    const expiration = now + 7 * 24 * 60 * 60;

    const dataToReturn = {
      principal: {
        Id: accountIdSite,
        Birthday: siteData.date ? new Date(siteData.date).toISOString() : null,
        Diamantes: cdaDiamantesRow[0]?.diamantes || 0,
        DiscordId: userId,
        Email: siteData.email || null,
        Name: siteData.name || null,
        Priority: priorityCDA,
        HexSerial: siteData.serial || null,
        VipExpirationDate: cdaVipRow[0]?.data || null,
        VipId: vipStatusCDA,
        Whitelisted: isAllowlistCDA
          ? "ALLOWLIST APROVADA"
          : "ALLOWLIST INATIVA",
      },
      valley: {
        Id: accountIdSite,
        Birthday: siteData.date ? new Date(siteData.date).toISOString() : null,
        Diamantes: valleyDiamantesRow[0]?.diamantes || 0,
        DiscordId: userId,
        Email: siteData.email || null,
        Name: siteData.name || null,
        Priority: priority,
        HexSerial: siteData.serial || null,
        VipExpirationDate: valleyVipRow[0]?.data || null,
        VipId: vipStatus,
        Whitelisted: isAllowlist ? "ALLOWLIST APROVADA" : "ALLOWLIST INATIVA",
      },
      discord: {
        id: userId,
        ...session.user,
      },
      roles: discordRoles,
      iat: now,
      exp: expiration,
    };

    const response = NextResponse.json(dataToReturn);
    response.cookies.set("userData", JSON.stringify(dataToReturn), {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: `Erro interno no servidor ${error}` },
      { status: 500 }
    );
  }
}
