// IMPORTANTE API DADOS ***

const { signIn } = require("next-auth/react");

const URLTokenOAuth =
  "https://discord.com/oauth2/authorize?client_id=844113659432796161&response_type=code&scope=identify+guilds+email&redirect_uri=https://c94e-2804-1b1-b000-fb21-9d94-3ede-adf9-5071.ngrok-free.app/webapi/auth/discord/redirect";

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

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// IMPORTANTE API DADOS ***

verifyAccount();
checkUserLogin();
checkAllowlistStatus();
fetchDiamantes();

function scrollToSection(section) {
  if (section === "home") {
    $("html, body").animate({ scrollTop: 0 }, 200);
  } else {
    const target = $("div[section='" + section + "']");
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top,
        },
        200
      );
    }
  }
}

$(document).ready(function () {
  if (window.location.hash) {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }

  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get("section");
  if (section) {
    scrollToSection(section);
  }

  setTimeout(function () {
    if (window.location.search.includes("section=")) {
      history.replaceState(null, "", window.location.pathname);
    }
  }, 100);
});

function handleNavigation(event, section) {
  event.preventDefault();

  const validSections = [
    "home",
    "starter-pack",
    "vip",
    "how-to-play",
    "contact",
  ];

  if (!validSections.includes(section)) {
    section = "home";
  }

  if (window.location.pathname === "/") {
      scrollToSection(section);
  } else {
    setTimeout(() => {
      window.location.href = "/?section=" + section;
    }, 300, 1)
  }
}

function logout() {
  document.cookie = "userData=; path=/; max-age=0;";

  sessionStorage.clear();
  localStorage.clear();

  window.location.href = "/logout";
}

async function verifyAccount() {
  try {
    const data = await fetchUserData();

    if (!data || !data.valley) {
      throw new Error("Dados de usuário ausentes ou incompletos.");
    }

    const { Name, Email, Birthday, HexSerial } = data.valley;

    const containerRegistro = document.getElementById(
      "registro-modal-container"
    );

    const isIncomplete = !Name || !Email || !Birthday || !HexSerial;

    if (containerRegistro) {
      if (isIncomplete) {
        containerRegistro.classList.add("ativo");
        document.body.classList.add("no-scroll");
      } else {
        console.log("Usuário já tem conta completa, não exibe registro.");
        containerRegistro.classList.remove("ativo");
        document.body.classList.remove("no-scroll");
      }
    }
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    document
      .getElementById("registro-modal-container")
      ?.classList.remove("ativo");
    document.body.classList.remove("no-scroll");
  }
}


function toggleButton(enable, href) {
  const button = document.querySelector(".connect-button");
  if (!button) return;

  if (enable) {
    button.classList.remove("disabled");
    if (href) button.href = href;
  } else {
    button.classList.add("disabled");
    button.removeAttribute("href");
  }
}

document.addEventListener('DOMContentLoaded', function () {
    const twitterButton = document.getElementById('twitter');
    if (twitterButton) {
        twitterButton.addEventListener('click', function () {
            window.open("https://x.com/cidadealtamtagg", "_blank");
        });
    }

    const instagramButton = document.getElementById('instagram');
    if (instagramButton) {
        instagramButton.addEventListener('click', function () {
            window.open("https://www.instagram.com/cidadealtamtagg", "_blank");
        });
    }

    const youtubeButton = document.getElementById('youtube');
    if (youtubeButton) {
        youtubeButton.addEventListener('click', function () {
            window.open('https://youtube.com/@cidadealtamtagg', '_blank');
        });
    }

    const discordButton = document.getElementById('discord');
    if (discordButton) {
        discordButton.addEventListener('click', function () {
            window.open('https://discord.gg/asHmPCc3KZ', '_blank');
        });
    }

    const facebookButton = document.getElementById('facebook');
    if (facebookButton) {
        facebookButton.addEventListener('click', function () {
            window.open('https://facebook.com/cidadealtamtagg', '_blank');
        });
    }

    const perfilButton = document.getElementById('perfil-dn');
    if (perfilButton) {
        perfilButton.addEventListener('click', function () {
            window.location.href = "/dashboard";
        });
    }

    const suporteButton = document.getElementById('suporte-dn');
    if (suporteButton) {
        suporteButton.addEventListener('click', function () {
            window.location.href = "/dashboard/support";
        });
    }

    const valleyButton = document.getElementById("perfil-valley");
    const cdaButton = document.getElementById("perfil-cda");

    if (valleyButton) {
      valleyButton.addEventListener("click", async () => {
        const serverText = document.getElementById("s-servidor");
        if (!serverText) return;
      
        serverText.innerText = "VALLEY";
      
        try {
          const data = await fetchUserData();
          const whitelistStatus = data?.valley?.Whitelisted;
        
          const isWhitelisted = whitelistStatus === "ALLOWLIST APROVADA";
        
          toggleButton(isWhitelisted, isWhitelisted ? "/webapi/account/connect" : null);
        
          if (whitelistStatus === "ALLOWLIST INATIVA") {
            toggleButton(false);
          }
        } catch (error) {
          console.error("Erro ao buscar os dados do usuário:", error);
          toggleButton(false);
        }
      });
    }

    if (cdaButton) {
      cdaButton.addEventListener("click", async () => {
        const serverText = document.getElementById("s-servidor");
        if (!serverText) return;
      
        serverText.innerText = "CIDADE ALTA";
      
        try {
          const data = await fetchUserData();
          const whitelistStatus = data?.principal?.Whitelisted;
        
          const isWhitelisted = whitelistStatus === "ALLOWLIST APROVADA";
        
          toggleButton(isWhitelisted, isWhitelisted ? "/webapi/account/connect" : null);
        
          if (whitelistStatus === "ALLOWLIST INATIVA") {
            toggleButton(false);
          }
        } catch (error) {
          console.error("Erro ao buscar os dados do usuário:", error);
          toggleButton(false);
        }
      });
    }

    const logoutButton = document.getElementById('logout-dn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            })
                .then(response => {
                    if (response.ok) {
                        window.location.href = '/';
                    } else {
                        console.error('Erro ao fazer logout');
                    }
                })
                .catch(error => {
                    console.error('Erro ao fazer logout', error);
                });
        });
    }
});


const sectionHeader = document.querySelector('.section__header.animation');

const activateAnimation = () => {
    if (sectionHeader) {
        sectionHeader.classList.add('visible');
    }
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            activateAnimation();
        }
    });
};

if (sectionHeader) {
    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.5
    });

    observer.observe(sectionHeader);
}


document.querySelectorAll('a, button').forEach(function (element) {
    element.addEventListener('click', function (e) {
        if (!element.classList.contains('navbar__href') && !element.classList.contains('disabled')) {
            NProgress.start();

            let timer = 700;
            if (element.classList.contains('navbar__button')) {
                timer = 100;
            } else if (element.classList.contains('.navbar__logo')) {
                timer = 500;
            }

            setTimeout(() => {
                NProgress.done();
            }, timer);
        } else {
            e.preventDefault();
        }
    });
});

let isReloading = false;

document.querySelector('.navbar__logo').addEventListener('click', function (e) {
    e.preventDefault();

    if (!isReloading) {
        isReloading = true;

        window.scrollTo(0, 0);

        setTimeout(function () {
            location.reload();
        }, 1000);
    }
});

window.onload = function () {
    window.scrollTo(0, 0);
};

window.addEventListener("DOMContentLoaded", function () {
    NProgress.start();

    var a = document.getElementById("navbar__user-dropdowns")
    var b = document.getElementById("servidor")

    if (a && b) {
      a.classList.add("show");
      b.classList.add("show");
    }
});

window.addEventListener('load', async function() {
    const r = await fetchUserData();

    if (r || !r) {
      NProgress.done();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".section__navbar").classList.add("show");
});

const modalContainer = document.getElementById("custom-modal-container");
const loginButton = document.getElementById("navbar__button");
const modalContent = document.getElementById("custom-modal-content");

if (loginButton) {
    loginButton.addEventListener("click", () => {
      if (modalContainer) {
        modalContainer.classList.add("active");
        document.body.classList.add("no-scroll");
      }
    });
} else {
    console.error("Botão de login não encontrado!");
}

if (modalContainer) {
    modalContainer.addEventListener("click", (event) => {
        if (event.target === modalContainer) {
            modalContainer.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
    });
}

if (modalContainer) {
    modalContent.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

function ajustarTamanhoFonte(
  elemento,
  tamanhoInicial = 12,
  tamanhoMinimo = 2,
  passo = 0.01
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

async function checkUserLogin() {
  await verifyAccount();
  const data = await fetchUserData();

  const navbarButton = document.querySelector(".navbar__button");
  const userPhoto = document.getElementById("navbar__user-photo");
  const userDropdown = document.querySelector(".navbar__user-dropdown");
  const dropdownArrow = document.querySelector(".navbar__dropdown-arrow");
  const userPhotoD = document.getElementById("avatar");
  const containerRegistro = document.getElementById("registro-modal-container");

  document.getElementById("navbar__login").style.display = "none";
  document.getElementById("navbar__user").style.display = "block";

  if (containerRegistro) {
    if (
      !data ||
      !data.discord ||
      containerRegistro.classList.contains("ativo")
    ) {
      return resetUserUI();
    }
  }

  if (document.getElementById("emails")) {
    document.getElementById("emails").innerText = `${data.valley.Email}`;
  }

  if (document.getElementById("names")) {
    document.getElementById("names").innerText = `${data.valley.Name}`;
  }

  const discordData = data.discord;
  const avatarHash = discordData.avatar || "";

  const avatarUrl = avatarHash
    ? `https://cdn.discordapp.com/avatars/${discordData.id}/${avatarHash}${
        avatarHash.startsWith("a_") ? ".gif" : ".jpg"
      }`
    : `/images/default-profile-pic.png`;

  userPhoto.src = avatarUrl;

  if (userPhotoD) {
    userPhotoD.src = avatarUrl;
  }

  const userId = data?.valley?.Id || null;

  const discordIdElement = document.getElementById("discordId");
  if (discordIdElement) {
    discordIdElement.innerText = `Serial: ${"*".repeat(
      discordIdElement.dataset.realId.length
    )}`;
    ajustarTamanhoFonte(discordIdElement);
  }

  const emailElement = document.getElementById("email");
  if (emailElement) emailElement.innerText = discordData.email || "Unknown";

  const usernameElement = document.getElementById("usernamed");
  if (usernameElement) usernameElement.innerText = discordData.username;

  const accountIdElement = document.getElementById("accountId");
  if (accountIdElement)
    accountIdElement.innerText = userId
      ? `Account ID #${userId}`
      : "Account ID #";

  userPhoto.onload = () => {
    setTimeout(() => {
      document.getElementById("navbar__login").style.display = "none";
      document.getElementById("navbar__user").style.display = "block";

      navbarButton.classList.remove("no-user");
      navbarButton.classList.add("has-user");

      userPhoto.classList.remove("no-user");
      userDropdown.classList.remove("no-user");
      dropdownArrow.classList.remove("no-user");

      setTimeout(() => {
        userPhoto.classList.add("show");
        userDropdown.classList.add("show");
        dropdownArrow.classList.add("show");
      }, 300);
    }, 100);
  };

  userPhoto.onerror = resetUserUI;
}

function resetUserUI() {
  document.getElementById("navbar__login").style.display = "block";
  document.getElementById("navbar__user").style.display = "none";

  const navbarButton = document.querySelector(".navbar__button");
  const userPhoto = document.getElementById("navbar__user-photo");
  const userDropdown = document.querySelector(".navbar__user-dropdown");
  const dropdownArrow = document.querySelector(".navbar__dropdown-arrow");

  userPhoto.src = "/images/default-profile-pic.png";
  navbarButton.classList.remove("has-user");
  navbarButton.classList.add("no-user");
  userPhoto.classList.add("no-user");
  userDropdown.classList.add("no-user");
  dropdownArrow.classList.add("no-user");
}

function toggleDropdown() {
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
}

function toggleDropdowns() {
  const dropdown = document.getElementById("navbar__user-dropdowns");
  const button = document.getElementById("s-servidor");

  if (!dropdown || !button) return;

  if (dropdown.style.display === "block") {
    dropdown.classList.add("hide");

    setTimeout(() => {
      dropdown.style.display = "none";
      dropdown.classList.remove("hide");
      button.style.pointerEvents = "auto";
    }, 300);
  } else {
    dropdown.style.display = "block";

    setTimeout(() => {
      dropdown.classList.add("show");
      button.style.pointerEvents = "none";
    }, 10);
  }
}

document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("navbar__user-dropdowns");
  const button = document.getElementById("s-servidor");

  if (!dropdown || !button) return;

  if (!dropdown.contains(event.target) && !button.contains(event.target)) {
    dropdown.classList.add("hide");

    setTimeout(() => {
      dropdown.style.display = "none";
      dropdown.classList.remove("hide");
      button.style.pointerEvents = "auto";
    }, 300);
  }
});

document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("navbar__user-dropdown");
  const button = document.getElementById("navbar__user-photo");

  if (!dropdown || !button) return;

  if (!dropdown.contains(event.target) && !button.contains(event.target)) {
    dropdown.classList.add("hide");

    setTimeout(() => {
      dropdown.style.display = "none";
      dropdown.classList.remove("hide");
    }, 300);
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  const userPhoto = document.querySelector(".navbar__user-photo");
  const userDropdown = document.querySelector(".navbar__user-dropdown");
  const dropdownArrow = document.querySelector(".navbar__dropdown-arrow");
  const navbar = document.querySelector(".section__navbar");
  const diamantesContainer = document.querySelector(".navbar__diamantes");

  if (navbar) {
    navbar.classList.add("show");
  }

  try {
    const data = await fetchUserData();

    if (data) {
      setTimeout(() => {
        if (diamantesContainer) {
          setTimeout(() => {
            diamantesContainer.classList.add("show");
          }, 500);
        }

        const navbarButton = document.querySelector(".navbar__button");
        if (!navbarButton) {
          userPhoto?.classList.add("show");
          userDropdown?.classList.add("show");
          dropdownArrow?.classList.add("show");
        }
      }, 500);
    }
  } catch (error) {
    userPhoto?.classList.remove("show");
    userDropdown?.classList.remove("show");
    dropdownArrow?.classList.remove("show");
    //diamantesContainer?.classList.remove("show");
  }
});

async function checkAllowlistStatus() {
    try {
        toggleButton(false, "");

        const userData = await fetchUserData();

        if (!userData || !userData.valley || !userData.valley.Whitelisted) {
            console.log("Usuário autenticado, mas sem dados válidos");
            toggleButton(true);
            return;
        }

        toggleButton(userData.valley.Whitelisted === "ALLOWLIST APROVADA", "/webapi/account/connect");
    } catch (error) {
        console.error("Erro ao verificar a autenticação:", error);
    }
}


const menu = document.querySelector('.navbar__menu');
const dropdown = document.querySelector('.navbar__user-dropdown');

menu.addEventListener('click', () => {
    menu.classList.toggle('active');
    dropdown.classList.toggle('active');
});

async function fetchDiamantes() {
  try {
    const diamanteValorElement = document.getElementById("diamante-valor");
    const diamanteIcon = document.querySelector(".navbar__diamante-icon");

    diamanteValorElement.classList.remove("show-value");
    diamanteIcon.classList.remove("show-image");

    const userData = await fetchUserData();
    const diamantes = userData?.valley?.Diamantes || 0;

    const formattedDiamantes = diamantes
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    diamanteValorElement.textContent = formattedDiamantes;
    diamanteValorElement.classList.add("show-value");
    diamanteIcon.classList.add("show-image");
  } catch (error) {
    console.error("Erro ao buscar diamantes:", error);

    const diamanteValorElement = document.getElementById("diamante-valor");
    const diamanteIcon = document.querySelector(".navbar__diamante-icon");

    diamanteValorElement.textContent = "0";
    diamanteValorElement.classList.add("show-value");
    diamanteIcon.classList.add("show-image");
  }
}


if (document.getElementById("connectButton")) {
  document
    .getElementById("connectButton")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      const modalContainer = document.getElementById("custom-modal-container");

      if (this.classList.contains("disabled")) {
        return;
      }

      try {
        const userData = await fetchUserData();
        if (userData) {
          if (userData.valley.Whitelisted === "ALLOWLIST APROVADA") {
            window.open("mtasa://localhost:22003", "_blank");
          }
        } else {
          throw new Error("Usuário não autenticado");
        }
      } catch {
        modalContainer.classList.add("active");
        document.body.classList.add("no-scroll");
      }
    });
}

window.addEventListener('load', () => {
    if (window.location.pathname.length > 1 && window.location.pathname.endsWith('/')) {
        window.location.replace(window.location.pathname.replace(/\/+$/, ''));
    }
});

window.addEventListener('popstate', () => {
    if (window.location.pathname.length > 1 && window.location.pathname.endsWith('/')) {
        window.location.replace(window.location.pathname.replace(/\/+$/, ''));
    }
});

//const btn = document.getElementById("open-modal-btn");

const botao = document.querySelector(".registro-botao");
const formulario = document.getElementById("registro-formulario");
const containerRegistro = document.getElementById("registro-modal-container");

if (botao && formulario) {
  botao.addEventListener("click", async (event) => {
    event.preventDefault();
    console.clear();

    const inputs = formulario.querySelectorAll("input");
    const select = formulario.querySelector("select");
    let primeiroErro = null;

    inputs.forEach((input) => {
      input.setCustomValidity("");
      input.classList.remove("error");

      if (input.hasAttribute("required")) {
        const valor = input.value.trim();

        if (!valor) {
          input.classList.add("error");
          input.setCustomValidity("Este campo não pode ser vazio.");
          if (!primeiroErro) primeiroErro = input;
          return;
        }

        if (input.type === "email") {
          const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!regexEmail.test(valor)) {
            input.classList.add("error");
            input.setCustomValidity("Insira um e-mail válido.");
            if (!primeiroErro) primeiroErro = input;
          }
        }

        if (input.type === "date") {
          const data = new Date(valor);
          const hoje = new Date();
          hoje.setHours(0, 0, 0, 0);
          hoje.setDate(hoje.getDate() + 1);

          const idade = hoje.getFullYear() - data.getFullYear();
          const hojeFormatado = hoje.toLocaleDateString("pt-BR");

          if (isNaN(data.getTime()) || idade > 120 || data > hoje) {
            input.classList.add("error");
            input.setCustomValidity(
              `O valor deve ser ${hojeFormatado} ou anterior.`
            );
            if (!primeiroErro) primeiroErro = input;
          }
        }

        if (input.placeholder === "Serial") {
          const regexSerial = /^[A-F0-9]{32}$/;
          if (!regexSerial.test(valor)) {
            input.classList.add("error");
            input.setCustomValidity(
              `O Serial informado não é válido. Para acessá-lo, abra o MTA e digite "serial" no F8.`
            );
            if (!primeiroErro) primeiroErro = input;
          }
        }
      }
    });

    select.setCustomValidity("");
    select.classList.remove("error");

    if (!select.value) {
      select.classList.add("error");
      select.setCustomValidity("Selecione uma opção.");
      if (!primeiroErro) primeiroErro = select;
    }

    const redesInputs = formulario.querySelectorAll(
      ".registro-redes .input-icon input"
    );

    const userData = await fetchUserData();

    const dados = {
      discord_id: userData?.discord?.id,
      name: formulario.querySelector(".inputname").value.trim(),
      date: formulario.querySelector(".inputdate").value.trim(),
      email: formulario.querySelector(".inputemail").value.trim(),
      serial: formulario.querySelector(".inputserial").value.trim(),
      instagram: redesInputs[0]?.value.trim() || "0",
      twitch: redesInputs[1]?.value.trim() || "0",
      x: redesInputs[2]?.value.trim() || "0",
      yt: redesInputs[3]?.value.trim() || "0",
      recognize: select.value,
    };

    if (primeiroErro) {
      primeiroErro.reportValidity();
    } else {

      fetch("/webapi/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      })
        .then(async (res) => {
          const json = await res.json();
          if (res.ok) {
            const cookies = document.cookie.split(";");
            cookies.forEach((cookie) => {
              const cookieName = cookie.split("=")[0].trim();
              document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            });
            window.location.href = "/webapi/auth";
            containerRegistro.classList.remove("ativo");
            document.body.classList.remove("no-scroll");
          } else {
            console.error("Erro:", json);
          }
        })
        .catch((err) => {
        });
    }
  });
}

/*fetch("/webapi/mercadopago/history")
  .then((res) => res.json())
  .then((data) => {
    const historico = document.getElementById("historico");
    const semRegistros = document.getElementById("semRegistros");

    if (data.length === 0) {
      semRegistros.style.display = "block";
    } else {
      data.forEach((pagamento) => {
        const div = document.createElement("div");
        div.className = "historico-item";

        const produto = pagamento.description || "Produto Desconhecido";
        const status = pagamento.status === "approved" ? "Sucesso" : "Pendente";
        const valor = pagamento.transaction_amount
          ? `R$ ${pagamento.transaction_amount.toFixed(2)}`
          : "R$ ******";
        const qtde = pagamento.quantity || 1; // ajusta se tiver campo quantity
        const dataHora = new Date(pagamento.date_created).toLocaleString(
          "pt-BR"
        );

        div.innerHTML = `
          <div><b>#${pagamento.id}</b></div>
          <div>${qtde}</div>
          <div>${produto}</div>
          <div>${dataHora}</div>
          <div>${status}</div>
          <div>${valor}</div>
          <hr>
        `;

        historico.appendChild(div);
      });
    }
  })
.catch((err) => {
  console.error("Erro ao buscar pagamentos:", err);
});*/


const selectorAnimation = document.querySelectorAll(".animation");
const socialContainer = document.querySelector(".social-container");
const connectButton = document.querySelector(".connect-button");
const socialText = document.querySelector(".social-text");

const active = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      if (entry.target.classList.contains("section__header")) {
        if (socialContainer) socialContainer.classList.add("show");
        if (connectButton) connectButton.classList.add("show");
        if (socialText) socialText.classList.add("show");
      }
    } else {
      entry.target.classList.remove("show");

      if (entry.target.classList.contains("section__header")) {
        if (socialContainer) socialContainer.classList.remove("show");
        if (connectButton) connectButton.classList.remove("show");
        if (socialText) socialText.classList.remove("show");
      }
    }
  });
};

const itemObserve = new IntersectionObserver(active);
for (let i = 0; i < selectorAnimation.length; i++) {
  itemObserve.observe(selectorAnimation[i]);
}


$(".shop__category").click(function () {
  if (!$(this).hasClass("active")) {
    $(".shop__category").removeClass("active");
    $(this).addClass("active");
    $(".shop__cards").fadeOut();
    $("#category-" + $(this).data("category-index")).fadeIn();
  }
});


function navbar() {
  let element = document.getElementById("navbarNav");
  element.classList.toggle("navbar__nav--active");
}
