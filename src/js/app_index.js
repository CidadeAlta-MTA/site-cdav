let userData = null;
let userDataPromise = null;

async function fetchUserData() {
  if (userData) return userData;

  if (userDataPromise) return userDataPromise;

  userDataPromise = (async () => {
    const cookieData = getCookie("userData");
    if (cookieData) {
      userData = JSON.parse(cookieData);
      return userData;
    }

    try {
      const response = await fetch("/webapi/auth/me", {
        credentials: "include",
      });
      if (!response.ok) return null;

      userData = await response.json();

      document.cookie = `userData=${JSON.stringify(
        userData
      )}; path=/; max-age=${24 * 60 * 60};`;

      return userData;
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      return null;
    } finally {
      userDataPromise = null;
    }
  })();

  return userDataPromise;
}

indow.addEventListener("load", () => {
  console.log("Cookies salvos:", document.cookie);
});

checkAllowlistStatusD();
initializeDiscordId();

function toggleButtonAl(enable, href) {
  const button = document.querySelector(".connect-buttond");
  if (!button) return;

  if (enable) {
    button.classList.remove("disabled");
    if (href) button.href = href;
  } else {
    button.classList.add("disabled");
    button.removeAttribute("href");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname !== "/") {
    document.querySelectorAll(".navbar__link").forEach((link) => {
      link.style.color = "#A49FB4";
    });
    return;
  }

  const links = document.querySelectorAll(".navbar__link");
  const sections = document.querySelectorAll("[section]");

  function updateNavbarLink(activeSection) {
    links.forEach((link) => {
      const sectionName = link.textContent.trim().toLowerCase();

      const sectionTranslation = {
        "how-to-play": "como jogar",
        "starter-pack": "pacote inicial",
        contact: "contato",
      };

      const translatedSectionName =
        sectionTranslation[activeSection] || activeSection;
      link.style.color =
        sectionName === translatedSectionName ? "#AAFF29" : "#A49FB4";
    });
  }

  function getSectionFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("section");
  }

  const activeSectionFromUrl = getSectionFromUrl();
  if (activeSectionFromUrl) {
    updateNavbarLink(activeSectionFromUrl);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeSection = entry.target.getAttribute("section");
          updateNavbarLink(activeSection);
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  const activeSectionOnLoad = window.location.search.split("=")[1];
  if (activeSectionOnLoad) {
    updateNavbarLink(activeSectionOnLoad);
  }
});

toggleButtonAl(false);

async function checkAllowlistStatusD() {
  try {
    const data = await fetchUserData();
    if (!data || !data.valley) return;

    const allowlistStatus = data.valley.Whitelisted;
    const allowlistContainer = document.querySelector(".allowlist-container");
    const indicator = document.querySelector(".v2468_30");
    const allowlistStatusElement = document.getElementById("allowlist");

    if (allowlistStatusElement) {
      allowlistStatusElement.innerText = allowlistStatus;
    }

    if (allowlistContainer) {
      allowlistContainer.style.left =
        allowlistStatus === "ALLOWLIST APROVADA" ? "117.5px" : "125px";
    }

    if (indicator) {
      indicator.style.background =
        allowlistStatus === "ALLOWLIST APROVADA" ? "#AAFF29" : "#FF0000";
    }

    toggleButtonAl(allowlistStatus === "ALLOWLIST APROVADA");
  } catch (error) {
    console.error("Erro ao verificar a allowlist:", error);

    const allowlistContainer = document.querySelector(".allowlist-container");
    const indicator = document.querySelector(".v2468_30");
    const allowlistStatusElement = document.getElementById("allowlist");

    if (allowlistStatusElement)
      allowlistStatusElement.innerText = "Erro ao obter status";
    if (allowlistContainer) allowlistContainer.style.left = "125px";
    if (indicator) indicator.style.background = "#FF0000";

    toggleButtonAl(false);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  var al = await checkAllowlistStatusD();

  const connectButton = document.getElementById("connect-buttond");
  if (connectButton) {
    connectButton.addEventListener("click", async (event) => {
      event.preventDefault();

      if (connectButton.classList.contains("disabled")) return;

      try {
        const response = await fetchUserData();
        if (response) {
          if (userData.valley.Whitelisted === "ALLOWLIST APROVADA") {
            window.open("mtasa://localhost:22003", "_blank");
          }
        } else {
          throw new Error("Usuário não autenticado");
        }
      } catch (error) {
        console.error("Erro na verificação de login:", error);
      }
    });
  }
});

async function fetchVipStatus() {
  try {
    const response = await fetch("/webapi/account/vip");
    const data = await response.json();

    const vipElement = document.getElementById("vipStatus");
    if (vipElement) {
      vipElement.textContent = data.vipStatus;
    }
  } catch (error) {
    console.error("Erro ao buscar o status do VIP:", error);
    const vipElement = document.getElementById("vipStatus");
    if (vipElement) {
      vipElement.textContent = "Nenhum";
    }
  }
}

window.addEventListener("load", () => {
  if (
    window.location.pathname.length > 1 &&
    window.location.pathname.endsWith("/")
  ) {
    window.location.replace(window.location.pathname.replace(/\/+$/, ""));
  }
});

window.addEventListener("popstate", () => {
  if (
    window.location.pathname.length > 1 &&
    window.location.pathname.endsWith("/")
  ) {
    window.location.replace(window.location.pathname.replace(/\/+$/, ""));
  }
});

function ajustarTamanhoFonte(
  elemento,
  tamanhoInicial = 13,
  tamanhoMinimo = 2,
  passo = 0.5
) {
  let fontSize = tamanhoInicial;
  elemento.style.fontSize = fontSize + "px";

  while (
    elemento.scrollWidth > elemento.clientWidth &&
    fontSize > tamanhoMinimo
  ) {
    fontSize -= passo;
    elemento.style.fontSize = fontSize + "px";
  }
}

async function initializeDiscordId() {
  try {
    const data = await fetchUserData();
    if (!data || !data.discord) return;

    const discordIdElement = document.getElementById("discordId");
    if (!discordIdElement) return;

    const discordId = data.valley.HexSerial;
    let isHidden = true;

    discordIdElement.dataset.realId = discordId;
    discordIdElement.innerText = `Serial: ${"*".repeat(discordId.length)}`;

    if (discordIdElement) {
      ajustarTamanhoFonte(discordIdElement);
    }

    discordIdElement.addEventListener("click", function () {
      if (isHidden) {
        this.innerText = `Serial: ${this.dataset.realId}`;
      } else {
        this.innerText = `Serial: ${"*".repeat(this.dataset.realId.length)}`;
      }
      if (discordIdElement) {
        ajustarTamanhoFonte(this);
      }
      isHidden = !isHidden;
    });
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
  }
}
