"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter, FaReact, FaDiscord } from "react-icons/fa";

//const scripts = ["index", "main", "main2", "main3", "main4"];

export default function PageHome() {
  const { data: session, status } = useSession();
  const currentDate = new Date();
  const [data, setData] = useState(null);


  useEffect(() => {
    const el = document.getElementById("__NEXT_DATA__");
    if (el) {
      try {
        const json = JSON.parse('{ "patch": null }');
        setData(json);
      } catch (e) {
        console.error("Erro ao parsear __NEXT_DATA__", e);
      }
    }
  }, []);

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

    if (typeof window !== "undefined" && window.$) {
      console.log("jQuery is ready");
      window.$("#myElement").hide();
    }

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
    console.log("Botão clicado!");
    console.log("Session status:", status);
    console.log("Chamando signIn...");
    
    try {
      signIn("discord", { 
        callbackUrl: "/dashboard" // Especifique uma URL de callback
      });
    } catch (error) {
      console.error("Erro no signIn:", error);
    }
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
  };

  if (!session) {
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
          content="Cidade Alta MTA | Roleplay Único na América Latina"
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.0.7/css/all.css"
        />
        <title>Cidade Alta MTA | Roleplay Único na América Latina</title>{" "}
        <noscript data-n-css="" />
        <style
          data-href="https://fonts.googleapis.com/css2?family=Roboto&display=swap&family=Zen+Dots&display=swap"
          dangerouslySetInnerHTML={{
            __html:
              "\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: normal;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbWmQ.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Zen Dots';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/zendots/v12/XRXX3ICfm00IGoesQeaH.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmZiAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmQiAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmYiAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+1F00-1FFF\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmXiAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVnoiAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+0302-0303,U+0305,U+0307-0308,U+0310,U+0312,U+0315,U+031A,U+0326-0327,U+032C,U+032F-0330,U+0332-0333,U+0338,U+033A,U+0346,U+034D,U+0391-03A1,U+03A3-03A9,U+03B1-03C9,U  +03D1,U+03D5-03D6,U+03F0-03F1,U+03F4-03F5,U+2016-2017,U+2034-2038,U+203C,U+2040,U+2043,U+2047,U+2050,U+2057,U+205F,U+2070-2071,U+2074-208E,U+2090-209C,U+20D0-20DC,U+20E1,U+20E5-20EF,U   +2100-2112,U+2114-2115,U+2117-2121,U+2123-214F,U+2190,U+2192,U+2194-21AE,U+21B0-21E5,U+21F1-21F2,U+21F4-2211,U+2213-2214,U+2216-22FF,U+2308-230B,U+2310,U+2319,U+231C-2321,U+2336-237A,U   +237C,U+2395,U+239B-23B7,U+23D0,U+23DC-23E1,U+2474-2475,U+25AF,U+25B3,U+25B7,U+25BD,U+25C1,U+25CA,U+25CC,U+25FB,U+266D-266F,U+27C0-27FF,U+2900-2AFF,U+2B0E-2B11,U+2B30-2B4C,U+2BFE,U   +3030,U+FF5B,U+FF5D,U+1D400-1D7FF,U+1EE00-1EEFF\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVn6iAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+0001-000C,U+000E-001F,U+007F-009F,U+20DD-20E0,U+20E2-20E4,U+2150-218F,U+2190,U+2192,U+2194-2199,U+21AF,U+21E6-21F0,U+21F3,U+2218-2219,U+2299,U+22C4-22C6,U+2300-243F,U +2440-244A,U+2460-24FF,U+25A0-27BF,U+2800-28FF,U+2921-2922,U+2981,U+29BF,U+29EB,U+2B00-2BFF,U+4DC0-4DFF,U+FFF9-FFFB,U+10140-1018E,U+10190-1019C,U+101A0,U+101D0-101FD,U+102E0-102FB,U    +10E60-10E7E,U+1D2C0-1D2D3,U+1D2E0-1D37F,U+1F000-1F0FF,U+1F100-1F1AD,U+1F1E6-1F1FF,U+1F30D-1F30F,U+1F315,U+1F31C,U+1F31E,U+1F320-1F32C,U+1F336,U+1F378,U+1F37D,U+1F382,U+1F393-1F39F,U  +1F3A7-1F3A8,U+1F3AC-1F3AF,U+1F3C2,U+1F3C4-1F3C6,U+1F3CA-1F3CE,U+1F3D4-1F3E0,U+1F3ED,U+1F3F1-1F3F3,U+1F3F5-1F3F7,U+1F408,U+1F415,U+1F41F,U+1F426,U+1F43F,U+1F441-1F442,U+1F444,U  +1F446-1F449,U+1F44C-1F44E,U+1F453,U+1F46A,U+1F47D,U+1F4A3,U+1F4B0,U+1F4B3,U+1F4B9,U+1F4BB,U+1F4BF,U+1F4C8-1F4CB,U+1F4D6,U+1F4DA,U+1F4DF,U+1F4E3-1F4E6,U+1F4EA-1F4ED,U+1F4F7,U    +1F4F9-1F4FB,U+1F4FD-1F4FE,U+1F503,U+1F507-1F50B,U+1F50D,U+1F512-1F513,U+1F53E-1F54A,U+1F54F-1F5FA,U+1F610,U+1F650-1F67F,U+1F687,U+1F68D,U+1F691,U+1F694,U+1F698,U+1F6AD,U+1F6B2,U  +1F6B9-1F6BA,U+1F6BC,U+1F6C6-1F6CF,U+1F6D3-1F6D7,U+1F6E0-1F6EA,U+1F6F0-1F6F3,U+1F6F7-1F6FC,U+1F700-1F7FF,U+1F800-1F80B,U+1F810-1F847,U+1F850-1F859,U+1F860-1F887,U+1F890-1F8AD,U  +1F8B0-1F8BB,U+1F8C0-1F8C1,U+1F900-1F90B,U+1F93B,U+1F946,U+1F984,U+1F996,U+1F9E9,U+1FA00-1FA6F,U+1FA70-1FA7C,U+1FA80-1FA89,U+1FA8F-1FAC6,U+1FACE-1FADC,U+1FADF-1FAE9,U+1FAF0-1FAF8,U  +1FB00-1FBFF\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmbiAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmaiAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmUiAz0klQmz24.woff) format('woff');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Zen Dots';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/zendots/v12/XRXX3ICfm00IGoesQdaNRs7nczIHNHI.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Zen Dots';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/zendots/v12/XRXX3ICfm00IGoesQdaDRs7nczIH.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n    ",
          }}
        />
        <style
          data-href="https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Montserrat:wght@400;800&family=Raleway:wght@300;400;500;600;700;800&display=swap"
          dangerouslySetInnerHTML={{
            __html:
              "\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZs.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew9.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr70w9.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 300;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVuEooCM.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaooCM.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 500;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvoooCM.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 600;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVsEpYCM.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 700;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVs9pYCM.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtapYCM.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYAZJhjp-Ek-_EeAmM.woff) format('woff');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYAZthjp-Ek-_EeAmM.woff) format('woff');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYAZNhjp-Ek-_EeAmM.woff) format('woff');\n            unicode-range: U+1F00-1FFF\n        }\n\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYAZxhjp-Ek-_EeAmM.woff) format('woff');\n            unicode-range: U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF\n        }\n\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYAZBhjp-Ek-_EeAmM.woff) format('woff');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYAZFhjp-Ek-_EeAmM.woff) format('woff');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYAZ9hjp-Ek-_EeA.woff) format('woff');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 300;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCAIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 300;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCkIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 300;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCIIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 300;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 300;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCAIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCkIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCIIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 500;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCAIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 500;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCkIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 500;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCIIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 500;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 500;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 600;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCAIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 600;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCkIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 600;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCIIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 600;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 600;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 700;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCAIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 700;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCkIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 700;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCIIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 700;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 700;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCAIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCkIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCIIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n    ",
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n        #nprogress {\n            pointer-events: none;\n        }\n        #nprogress .bar {\n            background: #AAFF29;\n            position: fixed;\n            z-index: 9999;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 7px;\n        }\n        #nprogress .peg {\n            display: block;\n            position: absolute;\n            right: 0px;\n            width: 100px;\n            height: 100%;\n            box-shadow: 0 0 10px #AAFF29, 0 0 5px #AAFF29;\n            opacity: 1;\n            transform: rotate(3deg) translate(0px, -4px);\n        }\n        #nprogress .spinner {\n            display: block;\n            position: fixed;\n            z-index: 1031;\n            top: 15px;\n            right: 15px;\n        }\n        #nprogress .spinner-icon {\n            width: 17px;\n            height: 17px;\n            box-sizing: border-box;\n            border: solid 2px transparent;\n            border-top-color: #AAFF29;\n            border-left-color: #AAFF29;\n            border-radius: 50%;\n            animation: nprogress-spinner 400ms linear infinite;\n        }\n        @keyframes nprogress-spinner {\n            0% { transform: rotate(0deg); }\n            100% { transform: rotate(360deg); }\n        }\n    ",
          }}
        />
        <div section="home" id="home" className="app">
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
                  <li className="navbar__link">
                    <a
                      href="?section=home"
                      className="navbar__href"
                      onClick={(e) => handleNavigation(e, "home")}
                    >
                      HOME
                    </a>
                  </li>

                  <span className="navbar__separator">│</span>

                  <li className="navbar__link">
                    <a
                      href="?section=starter-pack"
                      className="navbar__href"
                      onClick={(e) => handleNavigation(e, "starter-pack")}
                    >
                      PACOTE INICIAL
                    </a>
                  </li>

                  <span className="navbar__separator">│</span>

                  <li className="navbar__link">
                    <a
                      href="?section=vip"
                      className="navbar__href"
                      onClick={(e) => handleNavigation(e, "vip")}
                    >
                      VIP
                    </a>
                  </li>

                  <span className="navbar__separator">│</span>

                  <li className="navbar__link">
                    <a
                      href="?section=how-to-play"
                      className="navbar__href"
                      onClick={(e) => handleNavigation(e, "how-to-play")}
                    >
                      COMO JOGAR
                    </a>
                  </li>

                  <span className="navbar__separator">│</span>

                  <li className="navbar__link">
                    <a
                      href="?section=contact"
                      className="navbar__href"
                      onClick={(e) => handleNavigation(e, "contact")}
                    >
                      CONTATO
                    </a>
                  </li>
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
        <div
          id="navbar__user-dropdowns"
          className="navbar__user-dropdowns"
          style={{ display: "none" }}
        >
          <ul>
            <li>
              <a id="perfil-valley">VALLEY</a>
            </li>
            <li>
              <a id="perfil-cda">CIDADE ALTA</a>
            </li>
          </ul>
        </div>
        <li id="navbar__user" className="navbar__user">
          <span id="navbar__diamantes" className="navbar__diamantes">
            <span
              onClick={() => toggleDropdowns()}
              id="s-servidor"
              className="navbar__servidor"
            >
              VALLEY
            </span>
            <Image
              src="/images/diamond.png"
              alt="Diamante"
              width={15} // coloque o tamanho real ou desejado
              height={15}
              className="navbar__diamante-icon"
            />
            <span id="diamante-valor">0</span>
          </span>
          <Image
            id="navbar__user-photo"
            src={session?.user?.image || "/images/default-profile-pic.png"}
            alt=""
            width={32} // coloque o tamanho real ou desejado
            height={32}
            className="navbar__user-photo"
            onClick={() => toggleDropdown()}
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
                <a id="logout-dn" onClick={() => logout()}>
                  Sair
                </a>
              </li>
            </ul>
          </div>
        </li>
        <div className="section__header animation">
          <div className="header__content">
            <h1 className="header__title">
              Cidade Alta MTA
              <br />
              Roleplay Único na América Latina
            </h1>
            <button
              onClick={handleDiscordLogin}
              className="connect-button"
              id="connectButton"
            >
              CONECTAR
            </button>
          </div>
          <div className="container">
            <div className="border">
              <div className="social-border">
                <div className="social-container">
                  <a id="twitter" className="social-icon twitter">
                    <FaTwitter />
                  </a>
                  <a id="instagram" className="social-icon instagram">
                    <FaInstagram />
                  </a>
                  <a id="youtube" className="social-icon youtube">
                    <FaYoutube />
                  </a>
                  <a id="discord" className="social-icon discord">
                    <FaDiscord />
                  </a>
                  <a id="facebook" className="social-icon facebook">
                    <FaFacebook />
                  </a>
                </div>
                <p className="social-text">SIGA NAS REDES SOCIAIS</p>
              </div>
            </div>
          </div>
        </div>
        <div
          section="starter-pack"
          id="starter-pack"
          className="section__about animation"
        >
          <div className="about__content">
            <h1 className="about__title">About</h1>
            <p className="about__description" />
            <div className="about__cards">
              <div className="row">
                <div className="col-lg-2">
                  <div className="about__info">
                    <div className="about__square">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={20}
                        viewBox="0 0 18 22"
                      >
                        <path
                          id="shield"
                          d="M12,22s8-4,8-10V5L12,2,4,5v7C4,18,12,22,12,22Z"
                          transform="translate(-3 -1)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>
                    <div className="about__info__text">
                      <p className="about__info__title">Segurança</p>
                      <p className="about__info__description" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="about__info">
                    <div className="about__square">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={20}
                        viewBox="0 0 18 22"
                      >
                        <path
                          id="shield"
                          d="M12,22s8-4,8-10V5L12,2,4,5v7C4,18,12,22,12,22Z"
                          transform="translate(-3 -1)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>
                    <div className="about__info__text">
                      <p className="about__info__title">Quando Surgimos?</p>
                      <p className="about__info__description" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="about__info">
                    <div className="about__square">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={20}
                        viewBox="0 0 18 22"
                      >
                        <path
                          id="shield"
                          d="M12,22s8-4,8-10V5L12,2,4,5v7C4,18,12,22,12,22Z"
                          transform="translate(-3 -1)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>
                    <div className="about__info__text">
                      <p className="about__info__title">Lorem ipsum dolor</p>
                      <p className="about__info__description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras accumsan dignissim magna nec egestas. Maecenas
                        fermentum est ut velit luctus, vitae.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="about__info">
                    <div className="about__square">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={20}
                        viewBox="0 0 18 22"
                      >
                        <path
                          id="shield"
                          d="M12,22s8-4,8-10V5L12,2,4,5v7C4,18,12,22,12,22Z"
                          transform="translate(-3 -1)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>
                    <div className="about__info__text">
                      <p className="about__info__title">Lorem ipsum dolor</p>
                      <p className="about__info__description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Cras accumsan dignissim magna nec egestas. Maecenas
                        fermentum est ut velit luctus, vitae.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div section="vip" id="vip" className="section__shop animation">
          <h1 className="shop__title">Acesso Vip</h1>
          <p className="shop__description" />
          <div className="shop__cards" id="category-1">
            <div className="row">
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="shop__cards"
            id="category-2"
            style={{ display: "none" }}
          >
            <div className="row">
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="shop__cards"
            id="category-3"
            style={{ display: "none" }}
          >
            <div className="row">
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="shop__cards"
            id="category-4"
            style={{ display: "none" }}
          >
            <div className="row">
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="shop__card">
                  <svg
                    className="shop__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="47.719"
                    height="51.149"
                    viewBox="0 0 33.719 41.149"
                  >
                    <path
                      id="shield"
                      d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                      transform="translate(-2)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                    />
                  </svg>
                  <h2 className="shop__card__title">Lorem ipsum</h2>
                  <p className="shop__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas
                    fermentum est ut velit luctus, vitae vestibulum nisl
                    condimentum. Sed tincidunt purus sit amet magna viverra
                    suscipit.
                  </p>
                  <p className="shop__card__price">
                    Price <span>1,99$</span>
                  </p>
                  <div
                    data-sellix-product={1111111}
                    type="submit"
                    alt="Buy Now with sellix.io"
                    className="shop__card__purchase"
                  >
                    <svg
                      className="shop__card__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.586"
                      height="17.624"
                      viewBox="0 0 15.586 16.624"
                    >
                      <g id="shopping-bag" transform="translate(1 1)">
                        <path
                          id="Path_3"
                          data-name="Path 3"
                          d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                          transform="translate(-2.575 -2)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_2"
                          data-name="Line 2"
                          x2="13.586"
                          transform="translate(0 2.736)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <path
                          id="Path_4"
                          data-name="Path 4"
                          d="M13.849,10A2.925,2.925,0,0,1,8,10"
                          transform="translate(-3.92 -4.151)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                    Purchase
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div section="how-to-play" className="section__faq animation">
          <h1 className="faq__title">FAQ</h1>
          <p className="faq__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            accumsan dignissim magna nec egestas. Maecenas fermentum est ut
            velit luctus, vitae.
          </p>
          <div className="faq__cards">
            <div className="row">
              <div className="col-lg-2">
                <div className="faq__card">
                  <div className="faq__card__text">
                    <h2 className="faq__card__text__title">FAQ card</h2>
                    <p className="faq__card__description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras accumsan
                    </p>
                  </div>
                  <div className="faq__card__plus">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={21}
                      height={20}
                      viewBox="0 0 21 20"
                    >
                      <g id="plus" transform="translate(1 0.818)">
                        <line
                          id="Line_3"
                          data-name="Line 3"
                          y2={18}
                          transform="translate(10 0.182)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_4"
                          data-name="Line 4"
                          x2={19}
                          transform="translate(0 9.182)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="faq__card__content" style={{ display: "none" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </div>
              </div>
              <div className="col-lg-2">
                <div className="faq__card">
                  <div className="faq__card__text">
                    <h2 className="faq__card__text__title">FAQ card</h2>
                    <p className="faq__card__description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras accumsan
                    </p>
                  </div>
                  <div className="faq__card__plus">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={21}
                      height={20}
                      viewBox="0 0 21 20"
                    >
                      <g id="plus" transform="translate(1 0.818)">
                        <line
                          id="Line_3"
                          data-name="Line 3"
                          y2={18}
                          transform="translate(10 0.182)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_4"
                          data-name="Line 4"
                          x2={19}
                          transform="translate(0 9.182)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="faq__card__content" style={{ display: "none" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </div>
              </div>
              <div className="col-lg-2">
                <div className="faq__card">
                  <div className="faq__card__text">
                    <h2 className="faq__card__text__title">FAQ card</h2>
                    <p className="faq__card__description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras accumsan
                    </p>
                  </div>
                  <div className="faq__card__plus">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={21}
                      height={20}
                      viewBox="0 0 21 20"
                    >
                      <g id="plus" transform="translate(1 0.818)">
                        <line
                          id="Line_3"
                          data-name="Line 3"
                          y2={18}
                          transform="translate(10 0.182)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_4"
                          data-name="Line 4"
                          x2={19}
                          transform="translate(0 9.182)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="faq__card__content" style={{ display: "none" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </div>
              </div>
              <div className="col-lg-2">
                <div className="faq__card">
                  <div className="faq__card__text">
                    <h2 className="faq__card__text__title">FAQ card</h2>
                    <p className="faq__card__description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras accumsan
                    </p>
                  </div>
                  <div className="faq__card__plus">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={21}
                      height={20}
                      viewBox="0 0 21 20"
                    >
                      <g id="plus" transform="translate(1 0.818)">
                        <line
                          id="Line_3"
                          data-name="Line 3"
                          y2={18}
                          transform="translate(10 0.182)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                        <line
                          id="Line_4"
                          data-name="Line 4"
                          x2={19}
                          transform="translate(0 9.182)"
                          fill="none"
                          stroke="#cf9816"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="faq__card__content" style={{ display: "none" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div section="contact" className="section__reviews animation">
          <h1 className="reviews__title">Reviews</h1>
          <p className="reviews__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            accumsan dignissim magna nec egestas. Maecenas fermentum est ut
            velit luctus, vitae.
          </p>
          <div className="reviews__cards">
            <div className="row">
              <div className="col-lg-4">
                <div className="reviews__card">
                  <h3 className="reviews__card__name">Maykoo235</h3>
                  <div className="reviews__stars">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      className="reviews__negative"
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#949494"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <p className="reviews__card__review">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="reviews__card">
                  <h3 className="reviews__card__name">Maykoo235</h3>
                  <div className="reviews__stars">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#949494"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <p className="reviews__card__review">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="reviews__card">
                  <h3 className="reviews__card__name">Maykoo235</h3>
                  <div className="reviews__stars">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#949494"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <p className="reviews__card__review">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas.
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="reviews__card">
                  <h3 className="reviews__card__name">Maykoo235</h3>
                  <div className="reviews__stars">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height="21.02"
                      viewBox="0 0 22 21.02"
                    >
                      <path
                        id="star"
                        d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                        transform="translate(-1 -1)"
                        fill="none"
                        stroke="#949494"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <p className="reviews__card__review">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan dignissim magna nec egestas. Maecenas.
                  </p>
                </div>
              </div>
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
                <a href="">
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
        <div id="custom-modal-container">
          <div id="custom-modal-content">
            <h2 className="modal-title">Bem-Vindo!</h2>
            <p className="modal-text">Faça login com Discord</p>
            <button
              className="discord-btn"
              onClick={() => {
                console.log("Teste de clique funcionando!");
                alert("Botão funcionando!");
                signIn("discord");
              }}
            >
              Entrar com o Discord
            </button>
          </div>
        </div>
        <div id="registro-modal-container">
          <div id="registro-modal-content">
            <h2 className="registro-titulo">Registro</h2>
            <p className="registro-subtitulo">
              Você ainda não possui uma conta, cadastre-se
            </p>
            <form id="registro-formulario">
              <div className="input-icon">
                <i
                  className="fas fa-user-alt"
                  style={{ top: "22%", color: "#6f79ad" }}
                />
                <input
                  className="inputname"
                  type="text"
                  placeholder="Nome completo"
                  required=""
                />
              </div>
              <div className="input-icon">
                <i
                  className="fas fa-birthday-cake"
                  style={{ top: "22%", color: "#6f79ad" }}
                />
                <input
                  className="inputdate"
                  type="date"
                  placeholder="dd/mm/aaaa"
                  required=""
                />
              </div>
              <div className="input-icon">
                <i
                  className="fas fa-envelope"
                  style={{ top: "22%", color: "#6f79ad" }}
                />
                <input
                  className="inputemail"
                  type="email"
                  placeholder="E-mail"
                  required=""
                />
              </div>
              <div className="input-icon">
                <i
                  className="fa-solid fa-barcode"
                  style={{ top: "22%", color: "#6f79ad" }}
                />
                <input
                  className="inputserial"
                  type="text"
                  placeholder="Serial"
                  required=""
                />
              </div>
              <p className="registro-label">Suas redes sociais</p>
              <div className="registro-redes">
                <div className="input-icon">
                  <i
                    className="fab fa-instagram"
                    style={{ top: "22%", color: "#6f79ad" }}
                  />
                  <input
                    type="text"
                    placeholder=""
                    style={{ paddingTop: 10, paddingLeft: 35, width: "100%" }}
                  />
                </div>
                <div className="input-icon">
                  <i
                    className="fab fa-twitch"
                    style={{ top: "22%", color: "#6f79ad" }}
                  />
                  <input
                    type="text"
                    placeholder=""
                    style={{ paddingTop: 10, paddingLeft: 35, width: "100%" }}
                  />
                </div>
                <div className="input-icon">
                  <i
                    className="fab fa-twitter"
                    style={{ top: "22%", color: "#6f79ad" }}
                  />
                  <input
                    type="text"
                    placeholder=""
                    style={{ paddingTop: 10, paddingLeft: 35, width: "100%" }}
                  />
                </div>
                <div className="input-icon">
                  <i
                    className="fab fa-youtube"
                    style={{ top: "22%", color: "#6f79ad" }}
                  />
                  <input
                    type="text"
                    placeholder=""
                    style={{ paddingTop: 10, paddingLeft: 35, width: "100%" }}
                  />
                </div>
              </div>
              <p className="registro-label">Como nos conheceu?</p>
              <select className="custom-select" required defaultValue="">
                <option value="" disabled hidden>
                  Selecionar
                </option>
                <option value="Discord">Discord</option>
                <option value="Amigos">Amigos</option>
                <option value="Redes sociais">Redes sociais</option>
                <option value="Outro">Outro</option>
              </select>
              <button type="button" className="registro-botao">
                Registre-se
              </button>
            </form>
          </div>
        </div>
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js"
          strategy="beforeInteractive"
        />
      </>
    );
  }

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
        content="Cidade Alta MTA | Roleplay Único na América Latina"
      />
      <meta
        data-react-helmet="true"
        property="og:image"
        content="/og-image.png"
      />
      <meta
        data-react-helmet="true"
        name="twitter:image:src"
        content="/images/og-image.png"
      />
      <meta property="og:image:width" content={1920} />
      <meta property="og:image:height" content={1080} />
      <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.0.7/css/all.css"
      />
      <title>Cidade Alta MTA | Roleplay Único na América Latina</title>{" "}
      <noscript data-n-css="" />
      <style
        data-href="https://fonts.googleapis.com/css2?family=Roboto&display=swap&family=Zen+Dots&display=swap"
        dangerouslySetInnerHTML={{
          __html:
            "\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: normal;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbWmQ.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Zen Dots';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/zendots/v12/XRXX3ICfm00IGoesQeaH.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmZiAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmQiAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmYiAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+1F00-1FFF\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmXiAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVnoiAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+0302-0303,U+0305,U+0307-0308,U+0310,U+0312,U+0315,U+031A,U+0326-0327,U+032C,U+032F-0330,U+0332-0333,U+0338,U+033A,U+0346,U+034D,U+0391-03A1,U+03A3-03A9,U+03B1-03C9,U  +03D1,U+03D5-03D6,U+03F0-03F1,U+03F4-03F5,U+2016-2017,U+2034-2038,U+203C,U+2040,U+2043,U+2047,U+2050,U+2057,U+205F,U+2070-2071,U+2074-208E,U+2090-209C,U+20D0-20DC,U+20E1,U+20E5-20EF,U   +2100-2112,U+2114-2115,U+2117-2121,U+2123-214F,U+2190,U+2192,U+2194-21AE,U+21B0-21E5,U+21F1-21F2,U+21F4-2211,U+2213-2214,U+2216-22FF,U+2308-230B,U+2310,U+2319,U+231C-2321,U+2336-237A,U   +237C,U+2395,U+239B-23B7,U+23D0,U+23DC-23E1,U+2474-2475,U+25AF,U+25B3,U+25B7,U+25BD,U+25C1,U+25CA,U+25CC,U+25FB,U+266D-266F,U+27C0-27FF,U+2900-2AFF,U+2B0E-2B11,U+2B30-2B4C,U+2BFE,U   +3030,U+FF5B,U+FF5D,U+1D400-1D7FF,U+1EE00-1EEFF\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVn6iAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+0001-000C,U+000E-001F,U+007F-009F,U+20DD-20E0,U+20E2-20E4,U+2150-218F,U+2190,U+2192,U+2194-2199,U+21AF,U+21E6-21F0,U+21F3,U+2218-2219,U+2299,U+22C4-22C6,U+2300-243F,U +2440-244A,U+2460-24FF,U+25A0-27BF,U+2800-28FF,U+2921-2922,U+2981,U+29BF,U+29EB,U+2B00-2BFF,U+4DC0-4DFF,U+FFF9-FFFB,U+10140-1018E,U+10190-1019C,U+101A0,U+101D0-101FD,U+102E0-102FB,U    +10E60-10E7E,U+1D2C0-1D2D3,U+1D2E0-1D37F,U+1F000-1F0FF,U+1F100-1F1AD,U+1F1E6-1F1FF,U+1F30D-1F30F,U+1F315,U+1F31C,U+1F31E,U+1F320-1F32C,U+1F336,U+1F378,U+1F37D,U+1F382,U+1F393-1F39F,U  +1F3A7-1F3A8,U+1F3AC-1F3AF,U+1F3C2,U+1F3C4-1F3C6,U+1F3CA-1F3CE,U+1F3D4-1F3E0,U+1F3ED,U+1F3F1-1F3F3,U+1F3F5-1F3F7,U+1F408,U+1F415,U+1F41F,U+1F426,U+1F43F,U+1F441-1F442,U+1F444,U  +1F446-1F449,U+1F44C-1F44E,U+1F453,U+1F46A,U+1F47D,U+1F4A3,U+1F4B0,U+1F4B3,U+1F4B9,U+1F4BB,U+1F4BF,U+1F4C8-1F4CB,U+1F4D6,U+1F4DA,U+1F4DF,U+1F4E3-1F4E6,U+1F4EA-1F4ED,U+1F4F7,U    +1F4F9-1F4FB,U+1F4FD-1F4FE,U+1F503,U+1F507-1F50B,U+1F50D,U+1F512-1F513,U+1F53E-1F54A,U+1F54F-1F5FA,U+1F610,U+1F650-1F67F,U+1F687,U+1F68D,U+1F691,U+1F694,U+1F698,U+1F6AD,U+1F6B2,U  +1F6B9-1F6BA,U+1F6BC,U+1F6C6-1F6CF,U+1F6D3-1F6D7,U+1F6E0-1F6EA,U+1F6F0-1F6F3,U+1F6F7-1F6FC,U+1F700-1F7FF,U+1F800-1F80B,U+1F810-1F847,U+1F850-1F859,U+1F860-1F887,U+1F890-1F8AD,U  +1F8B0-1F8BB,U+1F8C0-1F8C1,U+1F900-1F90B,U+1F93B,U+1F946,U+1F984,U+1F996,U+1F9E9,U+1FA00-1FA6F,U+1FA70-1FA7C,U+1FA80-1FA89,U+1FA8F-1FAC6,U+1FACE-1FADC,U+1FADF-1FAE9,U+1FAF0-1FAF8,U  +1FB00-1FBFF\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmbiAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmaiAz0klQmz24O0g.woff) format('woff');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Roboto';\n            font-style: normal;\n            font-weight: 400;\n            font-stretch: 100%;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmUiAz0klQmz24.woff) format('woff');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Zen Dots';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/zendots/v12/XRXX3ICfm00IGoesQdaNRs7nczIHNHI.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Zen Dots';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/zendots/v12/XRXX3ICfm00IGoesQdaDRs7nczIH.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n    ",
        }}
      />
      <style
        data-href="https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Montserrat:wght@400;800&family=Raleway:wght@300;400;500;600;700;800&display=swap"
        dangerouslySetInnerHTML={{
          __html:
            "\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZs.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew9.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr70w9.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 300;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVuEooCM.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaooCM.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 500;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvoooCM.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 600;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVsEpYCM.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 700;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVs9pYCM.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtapYCM.woff) format('woff')\n        }\n\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYAZJhjp-Ek-_EeAmM.woff) format('woff');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYAZthjp-Ek-_EeAmM.woff) format('woff');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYAZNhjp-Ek-_EeAmM.woff) format('woff');\n            unicode-range: U+1F00-1FFF\n        }\n\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYAZxhjp-Ek-_EeAmM.woff) format('woff');\n            unicode-range: U+0370-0377,U+037A-037F,U+0384-038A,U+038C,U+038E-03A1,U+03A3-03FF\n        }\n\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYAZBhjp-Ek-_EeAmM.woff) format('woff');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYAZFhjp-Ek-_EeAmM.woff) format('woff');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Inter';\n            font-style: normal;\n            font-weight: 900;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYAZ9hjp-Ek-_EeA.woff) format('woff');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Montserrat';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/montserrat/v29/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 300;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCAIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 300;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCkIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 300;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCIIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 300;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 300;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCAIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCkIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCIIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 400;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 500;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCAIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 500;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCkIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 500;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCIIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 500;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 500;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 600;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCAIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 600;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCkIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 600;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCIIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 600;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 600;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 700;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCAIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 700;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCkIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 700;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCIIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 700;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 700;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCAIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0460-052F,U+1C80-1C8A,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCkIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCIIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyCMIT4ttDfCmxA.woff2) format('woff2');\n            unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U +A720-A7FF\n        }\n\n        @font-face {\n            font-family: 'Raleway';\n            font-style: normal;\n            font-weight: 800;\n            font-display: swap;\n            src: url(https://fonts.gstatic.com/s/raleway/v34/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD\n        }\n    ",
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        #nprogress {\n            pointer-events: none;\n        }\n        #nprogress .bar {\n            background: #AAFF29;\n            position: fixed;\n            z-index: 9999;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 7px;\n        }\n        #nprogress .peg {\n            display: block;\n            position: absolute;\n            right: 0px;\n            width: 100px;\n            height: 100%;\n            box-shadow: 0 0 10px #AAFF29, 0 0 5px #AAFF29;\n            opacity: 1;\n            transform: rotate(3deg) translate(0px, -4px);\n        }\n        #nprogress .spinner {\n            display: block;\n            position: fixed;\n            z-index: 1031;\n            top: 15px;\n            right: 15px;\n        }\n        #nprogress .spinner-icon {\n            width: 17px;\n            height: 17px;\n            box-sizing: border-box;\n            border: solid 2px transparent;\n            border-top-color: #AAFF29;\n            border-left-color: #AAFF29;\n            border-radius: 50%;\n            animation: nprogress-spinner 400ms linear infinite;\n        }\n        @keyframes nprogress-spinner {\n            0% { transform: rotate(0deg); }\n            100% { transform: rotate(360deg); }\n        }\n    ",
        }}
      />
      <div section="home" id="home" className="app">
        <div className="section__navbar">
          <div className="navbar">
            <div className="navbar__header">
              <a href="" className="navbar__brand">
                <Image
                  src={"/images/logoico.png"}
                  alt="Logo"
                  width={50}
                  height={50}
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
                <li className="navbar__link">
                  <a
                    href="?section=home"
                    className="navbar__href"
                    onClick={(e) => handleNavigation(e, "home")}
                  >
                    HOME
                  </a>
                </li>

                <span className="navbar__separator">│</span>

                <li className="navbar__link">
                  <a
                    href="?section=starter-pack"
                    className="navbar__href"
                    onClick={(e) => handleNavigation(e, "starter-pack")}
                  >
                    PACOTE INICIAL
                  </a>
                </li>

                <span className="navbar__separator">│</span>

                <li className="navbar__link">
                  <a
                    href="?section=vip"
                    className="navbar__href"
                    onClick={(e) => handleNavigation(e, "vip")}
                  >
                    VIP
                  </a>
                </li>

                <span className="navbar__separator">│</span>

                <li className="navbar__link">
                  <a
                    href="?section=how-to-play"
                    className="navbar__href"
                    onClick={(e) => handleNavigation(e, "how-to-play")}
                  >
                    COMO JOGAR
                  </a>
                </li>

                <span className="navbar__separator">│</span>

                <li className="navbar__link">
                  <a
                    href="?section=contact"
                    className="navbar__href"
                    onClick={(e) => handleNavigation(e, "contact")}
                  >
                    CONTATO
                  </a>
                </li>
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
      <div
        id="navbar__user-dropdowns"
        className="navbar__user-dropdowns"
        style={{ display: "none" }}
      >
        <ul>
          <li>
            <a id="perfil-valley">VALLEY</a>
          </li>
          <li>
            <a id="perfil-cda">CIDADE ALTA</a>
          </li>
        </ul>
      </div>
      <li id="navbar__user" className="navbar__user">
        <span id="navbar__diamantes" className="navbar__diamantes">
          <span
            onClick={() => toggleDropdowns()}
            id="s-servidor"
            className="navbar__servidor"
          >
            VALLEY
          </span>
          <Image
            src="/images/diamond.png"
            alt="Diamante"
            width={32} // coloque o tamanho real ou desejado
            height={32}
            className="navbar__diamante-icon"
          />
          <span id="diamante-valor">0</span>
        </span>
        <Image
          id="navbar__user-photo"
          src={session?.user?.image || "/images/default-profile-pic.png"}
          alt=""
          width={32} // coloque o tamanho real ou desejado
          height={32}
          className="navbar__user-photo"
          onClick={() => toggleDropdown()}
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
              <a id="logout-dn" onClick={() => logout()}>
                Sair
              </a>
            </li>
          </ul>
        </div>
      </li>
      <div className="section__header animation">
        <div className="header__content">
          <h1 className="header__title">
            Cidade Alta MTA
            <br />
            Roleplay Único na América Latina
          </h1>
          <button className="connect-button" id="connectButton">
            CONECTAR
          </button>
        </div>
        <div className="container">
          <div className="border">
            <div className="social-border">
              <div className="social-container">
                <a id="twitter" className="social-icon twitter">
                  <FaTwitter />
                </a>
                <a id="instagram" className="social-icon instagram">
                  <FaInstagram />
                </a>
                <a id="youtube" className="social-icon youtube">
                  <FaYoutube />
                </a>
                <a id="discord" className="social-icon discord">
                  <FaDiscord />
                </a>
                <a id="facebook" className="social-icon facebook">
                  <FaFacebook />
                </a>
              </div>
              <p className="social-text">SIGA NAS REDES SOCIAIS</p>
            </div>
          </div>
        </div>
      </div>
      <div
        section="starter-pack"
        id="starter-pack"
        className="section__about animation"
      >
        <div className="about__content">
          <h1 className="about__title">About</h1>
          <p className="about__description" />
          <div className="about__cards">
            <div className="row">
              <div className="col-lg-2">
                <div className="about__info">
                  <div className="about__square">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={20}
                      viewBox="0 0 18 22"
                    >
                      <path
                        id="shield"
                        d="M12,22s8-4,8-10V5L12,2,4,5v7C4,18,12,22,12,22Z"
                        transform="translate(-3 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <div className="about__info__text">
                    <p className="about__info__title">Segurança</p>
                    <p className="about__info__description" />
                  </div>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="about__info">
                  <div className="about__square">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={20}
                      viewBox="0 0 18 22"
                    >
                      <path
                        id="shield"
                        d="M12,22s8-4,8-10V5L12,2,4,5v7C4,18,12,22,12,22Z"
                        transform="translate(-3 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <div className="about__info__text">
                    <p className="about__info__title">Quando Surgimos?</p>
                    <p className="about__info__description" />
                  </div>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="about__info">
                  <div className="about__square">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={20}
                      viewBox="0 0 18 22"
                    >
                      <path
                        id="shield"
                        d="M12,22s8-4,8-10V5L12,2,4,5v7C4,18,12,22,12,22Z"
                        transform="translate(-3 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <div className="about__info__text">
                    <p className="about__info__title">Lorem ipsum dolor</p>
                    <p className="about__info__description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras accumsan dignissim magna nec egestas. Maecenas
                      fermentum est ut velit luctus, vitae.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="about__info">
                  <div className="about__square">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={20}
                      viewBox="0 0 18 22"
                    >
                      <path
                        id="shield"
                        d="M12,22s8-4,8-10V5L12,2,4,5v7C4,18,12,22,12,22Z"
                        transform="translate(-3 -1)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <div className="about__info__text">
                    <p className="about__info__title">Lorem ipsum dolor</p>
                    <p className="about__info__description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras accumsan dignissim magna nec egestas. Maecenas
                      fermentum est ut velit luctus, vitae.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div section="vip" id="vip" className="section__shop animation">
        <h1 className="shop__title">Acesso Vip</h1>
        <p className="shop__description" />
        <div className="shop__cards" id="category-1">
          <div className="row">
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="shop__cards"
          id="category-2"
          style={{ display: "none" }}
        >
          <div className="row">
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="shop__cards"
          id="category-3"
          style={{ display: "none" }}
        >
          <div className="row">
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="shop__cards"
          id="category-4"
          style={{ display: "none" }}
        >
          <div className="row">
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shop__card">
                <svg
                  className="shop__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.719"
                  height="51.149"
                  viewBox="0 0 33.719 41.149"
                >
                  <path
                    id="shield"
                    d="M18.859,39.149s14.859-7.43,14.859-18.574v-13L18.859,2,4,7.572v13C4,31.719,18.859,39.149,18.859,39.149Z"
                    transform="translate(-2)"
                    fill="none"
                    stroke="#cf9816"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  />
                </svg>
                <h2 className="shop__card__title">Lorem ipsum</h2>
                <p className="shop__card__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas fermentum est
                  ut velit luctus, vitae vestibulum nisl condimentum. Sed
                  tincidunt purus sit amet magna viverra suscipit.
                </p>
                <p className="shop__card__price">
                  Price <span>1,99$</span>
                </p>
                <div
                  data-sellix-product={1111111}
                  type="submit"
                  alt="Buy Now with sellix.io"
                  className="shop__card__purchase"
                >
                  <svg
                    className="shop__card__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.586"
                    height="17.624"
                    viewBox="0 0 15.586 16.624"
                  >
                    <g id="shopping-bag" transform="translate(1 1)">
                      <path
                        id="Path_3"
                        data-name="Path 3"
                        d="M5.194,2,3,4.925V15.161a1.462,1.462,0,0,0,1.462,1.462H14.7a1.462,1.462,0,0,0,1.462-1.462V4.925L13.968,2Z"
                        transform="translate(-2.575 -2)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_2"
                        data-name="Line 2"
                        x2="13.586"
                        transform="translate(0 2.736)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        id="Path_4"
                        data-name="Path 4"
                        d="M13.849,10A2.925,2.925,0,0,1,8,10"
                        transform="translate(-3.92 -4.151)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                  Purchase
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div section="how-to-play" className="section__faq animation">
        <h1 className="faq__title">FAQ</h1>
        <p className="faq__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan
          dignissim magna nec egestas. Maecenas fermentum est ut velit luctus,
          vitae.
        </p>
        <div className="faq__cards">
          <div className="row">
            <div className="col-lg-2">
              <div className="faq__card">
                <div className="faq__card__text">
                  <h2 className="faq__card__text__title">FAQ card</h2>
                  <p className="faq__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan
                  </p>
                </div>
                <div className="faq__card__plus">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={21}
                    height={20}
                    viewBox="0 0 21 20"
                  >
                    <g id="plus" transform="translate(1 0.818)">
                      <line
                        id="Line_3"
                        data-name="Line 3"
                        y2={18}
                        transform="translate(10 0.182)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_4"
                        data-name="Line 4"
                        x2={19}
                        transform="translate(0 9.182)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="faq__card__content" style={{ display: "none" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                accumsan dignissim magna nec egestas. Maecenas fermentum est ut
                velit luctus, vitae vestibulum nisl condimentum. Sed tincidunt
                purus sit amet magna viverra suscipit.
              </div>
            </div>
            <div className="col-lg-2">
              <div className="faq__card">
                <div className="faq__card__text">
                  <h2 className="faq__card__text__title">FAQ card</h2>
                  <p className="faq__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan
                  </p>
                </div>
                <div className="faq__card__plus">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={21}
                    height={20}
                    viewBox="0 0 21 20"
                  >
                    <g id="plus" transform="translate(1 0.818)">
                      <line
                        id="Line_3"
                        data-name="Line 3"
                        y2={18}
                        transform="translate(10 0.182)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_4"
                        data-name="Line 4"
                        x2={19}
                        transform="translate(0 9.182)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="faq__card__content" style={{ display: "none" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                accumsan dignissim magna nec egestas. Maecenas fermentum est ut
                velit luctus, vitae vestibulum nisl condimentum. Sed tincidunt
                purus sit amet magna viverra suscipit.
              </div>
            </div>
            <div className="col-lg-2">
              <div className="faq__card">
                <div className="faq__card__text">
                  <h2 className="faq__card__text__title">FAQ card</h2>
                  <p className="faq__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan
                  </p>
                </div>
                <div className="faq__card__plus">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={21}
                    height={20}
                    viewBox="0 0 21 20"
                  >
                    <g id="plus" transform="translate(1 0.818)">
                      <line
                        id="Line_3"
                        data-name="Line 3"
                        y2={18}
                        transform="translate(10 0.182)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_4"
                        data-name="Line 4"
                        x2={19}
                        transform="translate(0 9.182)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="faq__card__content" style={{ display: "none" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                accumsan dignissim magna nec egestas. Maecenas fermentum est ut
                velit luctus, vitae vestibulum nisl condimentum. Sed tincidunt
                purus sit amet magna viverra suscipit.
              </div>
            </div>
            <div className="col-lg-2">
              <div className="faq__card">
                <div className="faq__card__text">
                  <h2 className="faq__card__text__title">FAQ card</h2>
                  <p className="faq__card__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras accumsan
                  </p>
                </div>
                <div className="faq__card__plus">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={21}
                    height={20}
                    viewBox="0 0 21 20"
                  >
                    <g id="plus" transform="translate(1 0.818)">
                      <line
                        id="Line_3"
                        data-name="Line 3"
                        y2={18}
                        transform="translate(10 0.182)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <line
                        id="Line_4"
                        data-name="Line 4"
                        x2={19}
                        transform="translate(0 9.182)"
                        fill="none"
                        stroke="#cf9816"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="faq__card__content" style={{ display: "none" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                accumsan dignissim magna nec egestas. Maecenas fermentum est ut
                velit luctus, vitae vestibulum nisl condimentum. Sed tincidunt
                purus sit amet magna viverra suscipit.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div section="contact" className="section__reviews animation">
        <h1 className="reviews__title">Reviews</h1>
        <p className="reviews__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan
          dignissim magna nec egestas. Maecenas fermentum est ut velit luctus,
          vitae.
        </p>
        <div className="reviews__cards">
          <div className="row">
            <div className="col-lg-4">
              <div className="reviews__card">
                <h3 className="reviews__card__name">Maykoo235</h3>
                <div className="reviews__stars">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    className="reviews__negative"
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#949494"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <p className="reviews__card__review">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="reviews__card">
                <h3 className="reviews__card__name">Maykoo235</h3>
                <div className="reviews__stars">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#949494"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <p className="reviews__card__review">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="reviews__card">
                <h3 className="reviews__card__name">Maykoo235</h3>
                <div className="reviews__stars">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#949494"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <p className="reviews__card__review">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="reviews__card">
                <h3 className="reviews__card__name">Maykoo235</h3>
                <div className="reviews__stars">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#cf9816"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height="21.02"
                    viewBox="0 0 22 21.02"
                  >
                    <path
                      id="star"
                      d="M12,2l3.09,6.26L22,9.27l-5,4.87,1.18,6.88L12,17.77,5.82,21.02,7,14.14,2,9.27,8.91,8.26Z"
                      transform="translate(-1 -1)"
                      fill="none"
                      stroke="#949494"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <p className="reviews__card__review">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  accumsan dignissim magna nec egestas. Maecenas.
                </p>
              </div>
            </div>
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
              <a href="">
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
      <div id="custom-modal-container" className="custom-modal-container">
        <div id="custom-modal-content" className="custom-modal-content">
          <h2 className="modal-title">Bem-Vindo!</h2>
          <p className="modal-text">Faça login com Discord</p>
          <button
            className="discord-btn"
            onClick={() => {
              console.log("Teste de clique funcionando!");
              alert("Botão funcionando!");
              signIn("discord");
            }}
          >
            Entrar com o Discord
          </button>
        </div>
      </div>
      <div id="registro-modal-container">
        <div id="registro-modal-content">
          <h2 className="registro-titulo">Registro</h2>
          <p className="registro-subtitulo">
            Você ainda não possui uma conta, cadastre-se
          </p>
          <form id="registro-formulario">
            <div className="input-icon">
              <i
                className="fas fa-user-alt"
                style={{ top: "22%", color: "#6f79ad" }}
              />
              <input
                className="inputname"
                type="text"
                placeholder="Nome completo"
                required=""
              />
            </div>
            <div className="input-icon">
              <i
                className="fas fa-birthday-cake"
                style={{ top: "22%", color: "#6f79ad" }}
              />
              <input
                className="inputdate"
                type="date"
                placeholder="dd/mm/aaaa"
                required=""
              />
            </div>
            <div className="input-icon">
              <i
                className="fas fa-envelope"
                style={{ top: "22%", color: "#6f79ad" }}
              />
              <input
                className="inputemail"
                type="email"
                placeholder="E-mail"
                required=""
              />
            </div>
            <div className="input-icon">
              <i
                className="fa-solid fa-barcode"
                style={{ top: "22%", color: "#6f79ad" }}
              />
              <input
                className="inputserial"
                type="text"
                placeholder="Serial"
                required=""
              />
            </div>
            <p className="registro-label">Suas redes sociais</p>
            <div className="registro-redes">
              <div className="input-icon">
                <i
                  className="fab fa-instagram"
                  style={{ top: "22%", color: "#6f79ad" }}
                />
                <input
                  type="text"
                  placeholder=""
                  style={{ paddingTop: 10, paddingLeft: 35, width: "100%" }}
                />
              </div>
              <div className="input-icon">
                <i
                  className="fab fa-twitch"
                  style={{ top: "22%", color: "#6f79ad" }}
                />
                <input
                  type="text"
                  placeholder=""
                  style={{ paddingTop: 10, paddingLeft: 35, width: "100%" }}
                />
              </div>
              <div className="input-icon">
                <i
                  className="fab fa-twitter"
                  style={{ top: "22%", color: "#6f79ad" }}
                />
                <input
                  type="text"
                  placeholder=""
                  style={{ paddingTop: 10, paddingLeft: 35, width: "100%" }}
                />
              </div>
              <div className="input-icon">
                <i
                  className="fab fa-youtube"
                  style={{ top: "22%", color: "#6f79ad" }}
                />
                <input
                  type="text"
                  placeholder=""
                  style={{ paddingTop: 10, paddingLeft: 35, width: "100%" }}
                />
              </div>
            </div>
            <p className="registro-label">Como nos conheceu?</p>
            <select className="custom-select" required defaultValue="">
              <option value="" disabled hidden>
                Selecionar
              </option>
              <option value="Discord">Discord</option>
              <option value="Amigos">Amigos</option>
              <option value="Redes sociais">Redes sociais</option>
              <option value="Outro">Outro</option>
            </select>
            <button type="button" className="registro-botao">
              Registre-se
            </button>
          </form>
        </div>
      </div>
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js"
        strategy="beforeInteractive"
      />
    </>
  );

}







