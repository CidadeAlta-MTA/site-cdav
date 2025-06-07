"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter, FaReact, FaDiscord } from "react-icons/fa";

export default function Dashboard() {
  const { data: session, status } = useSession();

  useEffect(() => {

    const scripts = [
      () => import(/* webpackChunkName: "page-main" */ "@/js/app_main"),
      () => import(/* webpackChunkName: "page-index" */ "@/js/app_index"),
    ];

    scripts.forEach((loadScript) => {
      loadScript()
        .then((mod) => {
          if (mod.initNav) mod.initNav();
        })
        .catch((err) => {
          console.error("Erro ao importar script:", err);
        });
    });

    const navbar = document.querySelector(".section__navbar");
    if (navbar && !navbar.classList.contains("show")) {
      navbar.classList.add("show");
    }

    const socialLinks = [
      { id: "twitter", url: "https://x.com/cidadealtamtagg" },
      { id: "instagram", url: "https://www.instagram.com/cidadealtamtagg" },
      { id: "youtube", url: "https://youtube.com/@cidadealtamtagg" },
      { id: "discord", url: "https://discord.gg/asHmPCc3KZ" },
      { id: "facebook", url: "https://facebook.com/cidadealtamtagg" },
      { id: "perfil-dn", url: "/dashboard", blank: false },
      { id: "suporte-dn", url: "/dashboard/support", blank: false },
    ];

    socialLinks.forEach(({ id, url, blank = true }) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          if (blank) {
            window.open(url, "_blank");
          } else {
            window.location.href = url;
          }
        });
      }
    });

  }, []);

  function handleDiscordLogin(e) {
    e.preventDefault();
    e.stopPropagation();
    signIn("discord");
  }

  const toggleDropdown = () => {
    const dropdown = document.getElementById("navbar__user-dropdown");
    if (!dropdown) return;

    if (dropdown.style.display === "block") {
      dropdown.classList.add("hide");
      setTimeout(() => {
        dropdown.style.display = "none";
        dropdown.classList.remove("hide");
      }, 300);
    } else {
      dropdown.style.display = "block";
      setTimeout(() => {
        dropdown.classList.add("show");
      }, 10);
    }
  };

  const logout = async () => {
    localStorage.clear();
    await signOut({ redirect: true });
    window.location.href = "/";
  };

  if (!session) { return }
  return (
    <>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@cidadealtamtarp" />
      <meta name="twitter:creator" content="@cidadealtamtarp" />
      <meta
        data-react-helmet="true"
        property="og:title"
        content="Dashbord | Cidade Alta MTA"
      />
      <meta
        data-react-helmet="true"
        property="og:image"
        content="/images/og-image.png"
      />
      <meta
        data-react-helmet="true"
        name="twitter:image:src"
        content="/images/og-image.png"
      />
      <meta property="og:image:width" content={1920} />
      <meta property="og:image:height" content={1080} />
      <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
      <title>Dashbord | Cidade Alta MTA</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Montserrat&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Inter&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.0.7/css/all.css"
      />
      <noscript data-n-css="" />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        #nprogress {\n            pointer-events: none;\n        }\n        #nprogress .bar {\n            background: #AAFF29;\n            position: fixed;\n            z-index: 9999;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 7px;\n        }\n        #nprogress .peg {\n            display: block;\n            position: absolute;\n            right: 0px;\n            width: 100px;\n            height: 100%;\n            box-shadow: 0 0 10px #AAFF29, 0 0 5px #AAFF29;\n            opacity: 1;\n            transform: rotate(3deg) translate(0px, -4px);\n        }\n        #nprogress .spinner {\n            display: block;\n            position: fixed;\n            z-index: 1031;\n            top: 15px;\n            right: 15px;\n        }\n        #nprogress .spinner-icon {\n            width: 17px;\n            height: 17px;\n            box-sizing: border-box;\n            border: solid 2px transparent;\n            border-top-color: #AAFF29;\n            border-left-color: #AAFF29;\n            border-radius: 50%;\n            animation: nprogress-spinner 400ms linear infinite;\n        }\n        @keyframes nprogress-spinner {\n            0% { transform: rotate(0deg); }\n            100% { transform: rotate(360deg); }\n        }\n\n        body {\n            display: flex;\n            flex-direction: column;\n            min-height: 100vh; /* Faz com que o body ocupe toda a altura */\n            padding-top: 30%;\n            background: url('/images/dashboard-bg.png') no-repeat center 0%; /* Ajusta a posição vertical */\n            font-family: 'Montserrat', sans-serif;\n            font-weight: 800;\n            height: 100%;\n            overflow-x: hidden;\n            background-color: var(--backgroundMain);\n        }\n\n        .footer__social__square{\n            margin: 320px 15px 0 0;\n            width: 50px;\n            height: 50px;\n            background-color: var(--backgroundSecond);\n            display: flex;\n            justify-content: center;\n            align-items: center;\n        }\n\n        .section__navbar {\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            background: rgba(29, 29, 29, 0.20);\n            backdrop-filter: blur(20px);\n            z-index: 1000;\n            padding: 0.125rem 1%;\n            transform: translateY(-100%);\n            transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;\n        }\n\n\n        @media only screen and (max-width: 1100px) {\n\n            .footer__social__square{\n                margin: 250px 15px 0 0;\n                width: 50px;\n                height: 50px;\n                background-color: var(--backgroundSecond);\n                display: flex;\n                justify-content: center;\n                align-items: center;\n            }\n\n        }\n\n\n        @media only screen and (max-width: 739px) {\n\n            .footer__social__square{\n                margin: 420px 15px 0 0;\n                width: 50px;\n                height: 50px;\n                background-color: var(--backgroundSecond);\n                display: flex;\n                justify-content: center;\n                align-items: center;\n            }\n        \n        }\n\n        @media only screen and (max-width: 480px) {\n\n            .footer__social__square{\n                margin: 520px 15px 0 0;\n                width: 50px;\n                height: 50px;\n                background-color: var(--backgroundSecond);\n                display: flex;\n                justify-content: center;\n                align-items: center;\n            }\n\n        }\n    ",
        }}
      />
      <div section="dashboard" id="dashboard" className="dashboard">
        <div className="section__navbar">
          <div className="navbar">
            <div className="navbar__header">
              <a href="" className="navbar__brand">
                <Image
                  src="/images/logoico.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="navbar__logo"
                />
              </a>
              <div className="navbar__menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={14}
                  viewBox="0 0 20 14"
                >
                  <g id="menu" transform="translate(-2 -5)">
                    <line
                      id="Line_1"
                      data-name="Line 1"
                      x2={15}
                      transform="translate(6 12)"
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                    <line
                      id="Line_2"
                      data-name="Line 2"
                      x2={18}
                      transform="translate(3 6)"
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                    <line
                      id="Line_3"
                      data-name="Line 3"
                      x2={18}
                      transform="translate(3 18)"
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="navbar__nav" id="navbarNav">
              <ul>
                <a href="?section=home" className="navbar__href">
                  <li className="navbar__link">HOME</li>
                </a>
                <span className="navbar__separator">│</span>
                <a href="?section=starter-pack" className="navbar__href">
                  <li className="navbar__link">PACOTE INICIAL</li>
                </a>
                <span className="navbar__separator">│</span>
                <a href="?section=vip" className="navbar__href">
                  <li className="navbar__link">VIP</li>
                </a>
                <span className="navbar__separator">│</span>
                <a href="?section=how-to-play" className="navbar__href">
                  <li className="navbar__link">COMO JOGAR</li>
                </a>
                <span className="navbar__separator">│</span>
                <a href="?section=contact" className="navbar__href">
                  <li className="navbar__link">CONTATO</li>
                </a>
              </ul>
            </div>
            <li>
              <a className="navbar__button" id="navbar__button">
                Login
              </a>
            </li>
          </div>
          <div className="navbar__blur" />
        </div>
      </div>
      <li id="navbar__login"></li>
      <li id="navbar__user" className="navbar__user">
        <span id="navbar__diamantes" className="navbar__diamantes">
          <Image
            src="/images/diamond.png"
            alt="Diamante"
            width={32}
            height={32}
            className="navbar__diamante-icon"
          />
          <span id="diamante-valor">0</span>
        </span>
        <Image
          id="navbar__user-photo"
          src={session?.user?.image || "/images/default-profile-pic.png"}
          alt=""
          width={32}
          height={32}
          className="navbar__user-photo"
          onClick={toggleDropdown}
        />
        <div className="navbar__dropdown-arrow" />
        <div
          id="navbar__user-dropdown"
          className="navbar__user-dropdown"
          style={{ display: "none" }}
        >
          <ul>
            <li>
              <a id="perfil-dn">Ver Perfil</a>
            </li>
            <li>
              <a id="suporte-dn">Suporte</a>
            </li>
            <li>
              <a id="logout-dn" onClick={logout}>
                Sair
              </a>
            </li>
          </ul>
        </div>
      </li>
      <div className="section__header animation"></div>
      <div className="v3166_158">
        <div className="v2469_56">
          <div className="v2468_51">
            <div className="v2468_17"></div>
            <div className="v2468_24">
              <div className="v2468_25">
                <p id="usernamed" className="v2468_27">
                  {session?.user?.name || "Desconhecido"}
                </p>
                <p id="accountId" className="v2468_28">
                  Account ID #
                </p>
              </div>
              <div className="v2468_26" />
              <div className="v2468_29" />
              <div className="allowlist-container">
                <div id="status-indicator" className="v2468_30" />
                <span id="allowlist" className="v2468_31">
                  ALLOWLIST INATIVA
                </span>
              </div>
              <button className="connect-buttond" id="connect-buttond">
                CONECTAR
              </button>
              <div className="v2468_32" />
              <span id="discordId" className="v2468_33" />
              <div className="v2468_34" />
              <div className="v2468_37" />
              <div className="v2468_38" />
              <div className="v2468_39" />
              <div className="v2468_40" />
              <span className="v2468_41">Seus Dados</span>
              <div
                id="historico"
                className="historico-lista"
                style={{ height: 400, overflowY: "auto" }}
              >
                <span id="semRegistros" style={{ display: "none" }}>
                  Não há registros
                </span>
              </div>
              <span id="names" className="v2468_45">
                {  }
              </span>
              <span id="emails" className="v2468_46">
                {session?.user?.email || "cidadealtamtarp@gmail.com"}
              </span>
              <span className="v2468_47">Nome</span>
              <span className="v2468_48">Email</span>
              <div className="v2468_49" />
            </div>
            <Image
              id="avatar"
              src={session?.user.image || "/images/default-profile-pic.png"}
              width={100}
              height={100}
              className="v2469_55"
            />
          </div>
        </div>
      </div>
      <div className="section__footer">
        <div className="row ">
          <div className="col-lg-2">
            <div className="footer__social">
              <a href="">
                <div className="footer__social__square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24.674"
                    height="18.799"
                    viewBox="0 0 24.674 18.799"
                  >
                    <path
                      id="discord-brands"
                      d="M46.92,33.587a.063.063,0,0,0-.032-.029A20.355,20.355,0,0,0,41.865,32a.076.076,0,0,0-.081.038,14.161,14.161,0,0,0-.625,1.284,18.793,18.793,0,0,0-5.641,0,12.99,12.99,0,0,0-.635-1.284A.079.079,0,0,0,34.8,32a20.3,20.3,0,0,0-5.022,1.557.072.072,0,0,0-.033.028A20.809,20.809,0,0,0,26.1,47.624a.085.085,0,0,0,.032.058A20.464,20.464,0,0,0,32.3,50.8a.08.08,0,0,0,.087-.028,14.611,14.611,0,0,0,1.26-2.05.078.078,0,0,0-.043-.109,13.477,13.477,0,0,1-1.925-.917.079.079,0,0,1-.008-.131c.129-.1.259-.2.382-.3a.076.076,0,0,1,.08-.011,14.6,14.6,0,0,0,12.4,0,.076.076,0,0,1,.081.01c.124.1.253.2.383.3a.079.079,0,0,1-.007.131,12.648,12.648,0,0,1-1.926.916.079.079,0,0,0-.042.11,16.41,16.41,0,0,0,1.259,2.048.078.078,0,0,0,.087.029,20.4,20.4,0,0,0,6.171-3.113.079.079,0,0,0,.032-.057A20.672,20.672,0,0,0,46.92,33.587ZM34.245,44.822a2.5,2.5,0,0,1,0-4.972,2.5,2.5,0,0,1,0,4.972Zm8.2,0a2.5,2.5,0,0,1,0-4.972,2.5,2.5,0,0,1,0,4.972Z"
                      transform="translate(-26 -31.999)"
                      fill="#f6f6f6"
                    />
                  </svg>
                </div>
              </a>
              <a>
                <div className="footer__social__square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20.344"
                    height="20.221"
                    viewBox="0 0 20.344 20.221"
                  >
                    <path
                      id="facebook-brands"
                      d="M28.344,18.172A10.172,10.172,0,1,0,16.583,28.221V21.113H14V18.172h2.584V15.931a3.589,3.589,0,0,1,3.842-3.957,15.655,15.655,0,0,1,2.277.2v2.5H21.419a1.47,1.47,0,0,0-1.658,1.589v1.909h2.821l-.451,2.941h-2.37v7.109A10.176,10.176,0,0,0,28.344,18.172Z"
                      transform="translate(-8 -8)"
                      fill="#f6f6f6"
                    />
                  </svg>
                </div>
              </a>
              <a href="">
                <div className="footer__social__square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22.885"
                    height="16.091"
                    viewBox="0 0 22.885 16.091"
                  >
                    <path
                      id="youtube-brands"
                      d="M37.339,66.518a2.875,2.875,0,0,0-2.023-2.036C33.532,64,26.375,64,26.375,64s-7.156,0-8.941.481a2.876,2.876,0,0,0-2.023,2.036,32.376,32.376,0,0,0,0,11.088,2.833,2.833,0,0,0,2.023,2c1.785.481,8.941.481,8.941.481s7.156,0,8.941-.481a2.833,2.833,0,0,0,2.023-2,32.376,32.376,0,0,0,0-11.088Zm-13.3,8.947V68.659l5.981,3.4Z"
                      transform="translate(-14.933 -64)"
                      fill="#f6f6f6"
                    />
                  </svg>
                </div>
              </a>
            </div>
            <div className="footer__copyright">
              Copyright © 2021-2025, Cidade Alta - MTA, All rights reserved
            </div>
          </div>
        </div>
      </div>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js"
        strategy="beforeInteractive"
      />
    </>
  );
}
