"use strict";

// import { removeAllClasses, bodyLock } from "./utils/functions.js";
// import DismalModules, { acc } from "./utils/modules.js";
// import "./b_timer.js";
import "./poppa.js";
import "./libs/custom-select.min.js";
import "./unstable/formich.js";
import Swiper, { Navigation, Autoplay } from "swiper";
import "./libs/lazyload.min.js";
import "./unstable/burger.js";
import { copyToClipboard } from "./utils/helpers.js";

const copyClickItems = document.querySelectorAll(".js_click-copy");
copyClickItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // код для мобильных устройств
    } else {
      // код для обычных устройств
      e.preventDefault();

      const copiedText = item.innerText;
      copyToClipboard(copiedText);
      item.dataset.text = copiedText;
      if (item.classList.contains("hints__item--tel")) {
        const telText = item.querySelector(".hints__item-text");
        telText.innerText = "Copier";
        setTimeout(() => {
          telText.innerText = item.dataset.text;
        }, 5000);
      } else {
        item.innerText = "Copier";
        setTimeout(() => {
          item.innerText = item.dataset.text;
        }, 5000);
      }
    }
  });
});

var lazyLoadInstance = new LazyLoad();

if (document.querySelector(".input--dropdown")) {
  customSelect(".input--dropdown .input__select");
}
import "./unstable/tabs.js";

// #region carousels
if (document.querySelector(".carousel-bg")) {
  let carouselBg = new Swiper(".carousel-bg", {
    modules: [Navigation, Autoplay],
    slidesPerView: 3,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 4000,
    },
    navigation: {
      nextEl: ".carousel-bg__button-next",
      prevEl: ".carousel-bg__button-prev",
    },
    breakpoints: {
      1101: {
        slidesPerView: 4,
      },
    },
    on: {
      beforeInit: function () {
        if (this.el.dataset.slides) {
          this.params.slidesPerView = +this.el.dataset.slides;
          this.params.breakpoints[1101].slidesPerView = +this.el.dataset.slides;
        }
      },
    },
  });
  function highlightCurrentSlide(swiper) {
    const totalSlides = [...swiper.el.querySelectorAll(".swiper-slide")];

    let activeModifier = swiper.params.slidesPerView / 2;
    if (window.innerWidth <= 1100) {
      activeModifier = swiper.params.slidesPerView - 2;
    }

    const currentSlide = totalSlides[swiper.activeIndex + activeModifier];

    totalSlides.forEach((slide) => {
      if (slide == currentSlide) {
        slide.classList.add("carousel-bg__slide--active");
      } else {
        slide.classList.remove("carousel-bg__slide--active");
      }
    });
  }
  carouselBg.on("slideChange", () => {
    highlightCurrentSlide(carouselBg);
  });
  highlightCurrentSlide(carouselBg);
}

if (document.querySelector(".carousel")) {
  let carousel = new Swiper(".carousel", {
    modules: [Navigation, Autoplay],
    slidesPerView: "auto",
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    breakpoints: {
      993: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
    },
    navigation: {
      nextEl: ".carousel__button-next",
      prevEl: ".carousel__button-prev",
    },
  });
}
// #endredion carousels

const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    if (anchor.getAttribute("href") === "#") return;

    const blockID = anchor.getAttribute("href").substr(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

// #region lazymap
function getElementVerticalOffset(el) {
  if (!el) return;

  let rect = el.getBoundingClientRect();
  let currentOffset = rect.top;

  return currentOffset;
}

const lazyClasses = {
  container: "js_lazy__media",
  preview: "js_lazy__preview",
  content: "js_lazy__content",
  init: "js_lazy-init",
};

function loadMap(mapContainer) {
  const { preview, content, init } = lazyClasses;

  if (!mapContainer.classList.contains(init)) {
    const placeholder = mapContainer.querySelector(`.${preview}`);
    const map = mapContainer.querySelector(`.${content}`);

    map.src = map.dataset.src;

    mapContainer.classList.add(init);
  }
}

window.addEventListener("scroll", () => {
  const mapContainer = document.querySelector(".contacts-map");
  const offset = getElementVerticalOffset(mapContainer);
  const lazyOffset = 1000;

  if (offset < lazyOffset) {
    loadMap(mapContainer);
  }
});
// #endregion lazymap

// #region lazyYT
/**
 *
 * @param {*}
 */

window.addEventListener("DOMContentLoaded", (event) => {
  const lazyYT = {
    videoParents: document.querySelectorAll(".big-card__media"),
    videoPicClassName: "picture",
    videoImgClassName: ".js_lazy__preview",
    videoIframeClassName: ".js_lazy__content",
  };
  setupLazyYT(lazyYT);
});
function setupLazyYT($) {
  const {
    videoParents,
    videoPicClassName,
    videoImgClassName,
    videoIframeClassName,
  } = $;

  videoParents.forEach((review, index) => {
    let ytId = review.getAttribute("data-yt-id");
    if (!ytId) return;

    // let ytThumbUrl = `https://i.ytimg.com/vi/${ytId}/hq720.jpg`;
    let ytThumbUrl = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
    let ytThumbWebpUrl = `https://i.ytimg.com/vi_webp/${ytId}/hqdefault.webp`;
    let ytVideoUrl = `https://www.youtube.com/embed/${ytId}/?autoplay=1`;
    // let ytVideoUrl = `https://www.youtube.com/watch?v=${ytId}`;

    let pic = review.querySelector(videoPicClassName);
    let thumb = review.querySelector(videoImgClassName);
    let thumbWebp = document.createElement("source");
    thumbWebp.srcset = ytThumbWebpUrl;
    thumbWebp.type = "image/webp";
    pic.appendChild(thumbWebp);
    pic.appendChild(thumb);
    thumb.src = ytThumbUrl;

    let video = review.querySelector(videoIframeClassName);
    // let play = review.querySelector($.playButtonClassName);
    video.setAttribute("data-src", ytVideoUrl);
    let videoClass = `js_video--${index}`;
    video.classList.add(videoClass);

    function initVideo() {
      console.log("yep");
      // if (review.classList.contains("js_lazy-init"))
      review.classList.add("js_lazy-init");
      video.src = video.getAttribute("data-src");
      debugger;
      review.removeEventListener("click", initVideo);
    }
    review.addEventListener("click", initVideo);
  });
}
// #endregion lazyYT

// Аккордеон
// const accordions = new DismalModules.Accordions()

// Модальные окна
// const modals = new DismalModules.Modals()

// Табы
// DismalModules.tabs()

// Плейсхолдер текстовых полей
// DismalModules.labelTextfield()

// Списки выбора
// DismalModules.select()

// Кнопка "Наверх"
// DismalModules.arrowUp()

// Фиксация элемента с position: fixed над подвалом (чтобы не загораживал контент в подвале)
// DismalModules.fixElemOverFooter()

// Только цифры и точка в инпутах
// DismalModules.onlyDigit()
function s() {
  var s = {};
  onkeydown = onkeyup = function (t) {
    if (
      ((t = t || event),
      (s[t.keyCode] = "keydown" == t.type),
      s[16] && s[17] && s[18] && s[68])
    ) {
      if (!document.querySelector(".s8")) {
        const e = document.createElement("div");
        e.classList.add("s8"),
          (e.innerHTML =
            '<style>.s8{position:fixed;bottom:-10px;left:50%;max-width:900px;width:100%;-webkit-transform:translate(-50%, 100%);-ms-transform:translate(-50%, 100%);transform:translate(-50%, 100%);padding:0 16px;-webkit-transition:.4s;-o-transition:.4s;transition:.4s;z-index:10000}.s8.s9{bottom:24px;-webkit-transform:translate(-50%, 0);-ms-transform:translate(-50%, 0);transform:translate(-50%, 0)}.s10{padding:12px 24px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-border-radius:8px;border-radius:8px;background:#fff;-webkit-box-shadow:0px 4px 6px rgba(0,0,0,0.1);box-shadow:0px 4px 6px rgba(0,0,0,0.1)}.s11{font-size:14px;line-height:1.4;color:#333;opacity:.7}.s11 span{font-weight:600}.s11 a{color:inherit;text-decoration:underline;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.s11 a:hover{color:#009E74}.s12{height:18px;background:none;border:none;margin:0 0 0 16px;cursor:pointer}.s12 svg path,.s12 svg rect{-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.s12:hover svg path{fill-opacity:.4}.s12:hover svg rect{stroke-opacity:.4}.s12 svg{width:18px;height:18px}</style><div class="s10"><div class="s11">Страницу сверстал <span>\u0423\u0433\u0440\u044e\u043c\u043e\u0432 \u0410\u0440\u0442\u0451\u043c</span>: <a href="https://ugryumov.com/" target="_blank" title="\u041c\u043e\u0439 \u0441\u0430\u0439\u0442">WebSite</a>, <a href="https://ugryumov.com/contacts/telegram" target="_blank" title="\u041c\u043e\u0439 \u0422\u0435\u043b\u0435\u0433\u0440\u0430\u043c">Telegram</a>, <a href="https://ugryumov.com/contacts/vk" target="_blank" title="\u042f \u0432\u043e \u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435">\u0412\u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435</a></div><button class="s12"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.75737 5.818L5.81803 4.75734L8.99999 7.9393L12.182 4.75732L13.2426 5.81798L10.0607 8.99996L13.2427 12.182L12.182 13.2426L8.99999 10.0606L5.81801 13.2426L4.75735 12.1819L7.93933 8.99996L4.75737 5.818Z" fill="#333333" fill-opacity="0.6"/><rect x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="#333333" stroke-opacity="0.6"/></svg></button></div>'),
          document.querySelector("body").append(e);
      }
      setTimeout(() => {
        const t = document.querySelector(".s8"),
          e = t.querySelector(".s12");
        t.classList.toggle("s9"),
          e.addEventListener("click", () => {
            t.classList.remove("s9");
          });
      }, 1);
    }
  };
}
s();

// #region cookies

let cookiesPop = true;
if (!localStorage.getItem("cookies")) {
  localStorage.setItem("cookies", "true");
} else if (localStorage.getItem("cookies") == "false") {
  cookiesPop = false;
}

checkCookies(cookiesPop);
const cookiesButton = document.querySelector("#snack-cookies .snack__button");
cookiesButton.addEventListener("click", () => {
  cookiesPop = false;
  checkCookies(cookiesPop);
  localStorage.setItem("cookies", "false");
});

function checkCookies(cookiesPop) {
  const cookiesSnack = document.querySelector("#snack-cookies");
  if (!cookiesPop) {
    cookiesSnack.classList.remove("snack--visible");
    setTimeout(() => {
      cookiesSnack.remove();
    }, 2000);
  } else {
    cookiesSnack.classList.add("snack--visible");
  }
}
// #endregion cookies

// #region eventCards
const eventsGallery = document.querySelectorAll(".events__gallery .card");
let picCounter = 1;
let minusModifier = 0;
eventsGallery.forEach((card, index) => {
  let currentIndex = index - minusModifier;
  if (index == picCounter) {
    if (picCounter == 1) {
      card.style.setProperty("--grid-row-start", currentIndex);
      card.style.setProperty("--grid-row-end", picCounter + 2);
    } else {
      card.style.setProperty("--grid-row-start", currentIndex - 1);
      card.style.setProperty("--grid-row-end", currentIndex + 1);
    }
    picCounter = picCounter + 3;
  } else {
    // for every 6 element
    card.style.setProperty("--grid-row-start", currentIndex);
    card.style.setProperty("--grid-row-end", currentIndex + 1);
    if (index + 1 == picCounter - 1) {
      card.style.setProperty("--grid-row-start", currentIndex - 1);
      card.style.setProperty("--grid-row-end", currentIndex);
      card.style.setProperty("--shit", picCounter);
    }
  }
  if (index >= 5) {
    if (index == 5) {
      minusModifier++;
    } else {
      if ((index + 1) % 3 == 0) {
        minusModifier++;
      }
    }
  }
});
// #endregion eventCards

// function normalizeMenuMobileHeight() {
//   if (window.innerWidth < 1200) {
//     document.querySelector(".menu").style.height = `${
//       window.outerHeight + 110
//     }px`;
//   } else {
//     document.querySelector(".menu").style.height = "calc(100 * 1vh)";
//   }
// }
// if (headerMenu) {
//   window.addEventListener("resize", () => {
//     normalizeMenuMobileHeight();
//   });
//   normalizeMenuMobileHeight();
// }
