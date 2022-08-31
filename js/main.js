/* ===================================================================
 * Main JS
 * ------------------------------------------------------------------- */

// filter projects on the basis of tabs
function filterProjects(tabName) {
  switch (tabName) {
    case "ReactJS":
      ["alisuq", "pluto", "frostie", "linked"].forEach(
        (id) => (document.getElementById(id).style.display = "flex")
      );
      ["votion", "cto"].forEach(
        (id) => (document.getElementById(id).style.display = "none")
      );
      break;

    case "NextJS":
      ["alisuq", "pluto", "frostie", "linked", "cto"].forEach(
        (id) => (document.getElementById(id).style.display = "none")
      );
      document.getElementById("votion").style.display = "flex";
      break;

    case "NodeJS":
      ["frostie"].forEach(
        (id) => (document.getElementById(id).style.display = "flex")
      );
      ["alisuq", "votion", "pluto", "linked", "cto"].forEach(
        (id) => (document.getElementById(id).style.display = "none")
      );
      break;

    default:
      ["alisuq", "votion", "pluto", "frostie", "linked", "cto"].forEach(
        (id) => (document.getElementById(id).style.display = "flex")
      );
      break;
  }
}

(function (html) {
  "use strict";

  html.className = html.className.replace(/\bno-js\b/g, "") + " js ";
  let swiperInit;

  /* Preloader
   * -------------------------------------------------- */
  const ssPreloader = function () {
    const preloader = document.querySelector("#preloader");
    if (!preloader) return;

    window.addEventListener("load", function () {
      document.querySelector("body").classList.remove("ss-preload");
      document.querySelector("body").classList.add("ss-loaded");

      preloader.addEventListener("transitionend", function (e) {
        if (e.target.matches("#preloader")) {
          this.style.display = "none";
        }
      });
    });

    // force page scroll position to top at page refresh
    // window.addEventListener('beforeunload' , function () {
    //     window.scrollTo(0, 0);
    // });
  }; // end ssPreloader

  /* Parallax
   * -------------------------------------------------- */
  const ssParallax = function () {
    const rellax = new Rellax(".rellax");
  }; // end ssParallax

  /* Move header menu
   * -------------------------------------------------- */
  const ssMoveHeader = function () {
    const hdr = document.querySelector(".s-header");
    const hero = document.querySelector("#hero");
    let triggerHeight;

    if (!(hdr && hero)) return;

    setTimeout(function () {
      triggerHeight = hero.offsetHeight - 170;
    }, 300);

    window.addEventListener("scroll", function () {
      let loc = window.scrollY;

      if (loc > triggerHeight) {
        hdr.classList.add("sticky");
      } else {
        hdr.classList.remove("sticky");
      }

      if (loc > triggerHeight + 20) {
        hdr.classList.add("offset");
      } else {
        hdr.classList.remove("offset");
      }

      if (loc > triggerHeight + 150) {
        hdr.classList.add("scrolling");
      } else {
        hdr.classList.remove("scrolling");
      }
    });
  }; // end ssMoveHeader

  /* Mobile Menu
   * ---------------------------------------------------- */
  const ssMobileMenu = function () {
    const toggleButton = document.querySelector(".s-header__menu-toggle");
    const headerNavWrap = document.querySelector(".s-header__nav-wrap");
    const siteBody = document.querySelector("body");

    if (!(toggleButton && headerNavWrap)) return;

    toggleButton.addEventListener("click", function (event) {
      event.preventDefault();
      toggleButton.classList.toggle("is-clicked");
      siteBody.classList.toggle("menu-is-open");
    });

    headerNavWrap.querySelectorAll(".s-header__nav a").forEach(function (link) {
      link.addEventListener("click", function (evt) {
        // at 800px and below
        if (window.matchMedia("(max-width: 800px)").matches) {
          toggleButton.classList.toggle("is-clicked");
          siteBody.classList.toggle("menu-is-open");
        }
      });
    });

    window.addEventListener("resize", function () {
      // above 800px
      if (window.matchMedia("(min-width: 801px)").matches) {
        if (siteBody.classList.contains("menu-is-open"))
          siteBody.classList.remove("menu-is-open");
        if (toggleButton.classList.contains("is-clicked"))
          toggleButton.classList.remove("is-clicked");
      }
    });
  }; // end ssMobileMenu

  /* Highlight active menu link on pagescroll
   * ------------------------------------------------------ */
  const ssScrollSpy = function () {
    const sections = document.querySelectorAll(".target-section");

    // Add an event listener listening for scroll
    window.addEventListener("scroll", navHighlight);

    function navHighlight() {
      // Get current scroll position
      let scrollY = window.pageYOffset;

      // Loop through sections to get height(including padding and border),
      // top and ID values for each
      sections.forEach(function (current) {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");

        /* If our current scroll position enters the space where current section
         * on screen is, add .current class to parent element(li) of the thecorresponding
         * navigation link, else remove it. To know which link is active, we use
         * sectionId variable we are getting while looping through sections as
         * an selector
         */
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document
            .querySelector(".s-header__nav a[href*=" + sectionId + "]")
            .parentNode.classList.add("current");
        } else {
          document
            .querySelector(".s-header__nav a[href*=" + sectionId + "]")
            .parentNode.classList.remove("current");
        }
      });
    }
  }; // end ssScrollSpy

  /* Swiper testimonials
   * ------------------------------------------------------ */
  // const ssSwiper = function () {
  //   const mySwiper = new Swiper(".swiper-container", {
  //     slidesPerView: 1,
  //     pagination: {
  //       el: ".swiper-pagination",
  //       clickable: true,
  //     },
  //     breakpoints: {
  //       // when window width is >= 401px
  //       401: {
  //         slidesPerView: 1,
  //         spaceBetween: 20,
  //       },
  //       // when window width is >= 801px
  //       801: {
  //         slidesPerView: 2,
  //         spaceBetween: 48,
  //       },
  //     },
  //   });
  // }; // end ssSwiper

  /* Swiper Porjects
   * ------------------------------------------------------ */
  const ssSwiper = function () {
    return new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }; // end ssSwiper

  /* Lightbox
   * ------------------------------------------------------ */
  const ssLightbox = function () {
    const folioLinks = document.querySelectorAll(".folio-item a");
    const modals = [];

    folioLinks.forEach(function (link) {
      let modalbox = link.getAttribute("href");
      let instance = basicLightbox.create(document.querySelector(modalbox), {
        onShow: function (instance) {
          //detect Escape key press
          document.addEventListener("keydown", function (evt) {
            evt = evt || window.event;
            if (evt.keyCode === 27) {
              instance.close();
            }
          });
        },
      });
      modals.push(instance);
    });

    folioLinks.forEach(function (link, index) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        modals[index].show();
        swiperInit && swiperInit.destroy(true, true);
        swiperInit = ssSwiper();
      });
    });
  }; // end ssLightbox

  /* Alert boxes
   * ------------------------------------------------------ */
  const ssAlertBoxes = function () {
    const boxes = document.querySelectorAll(".alert-box");

    boxes.forEach(function (box) {
      box.addEventListener("click", function (e) {
        if (e.target.matches(".alert-box__close")) {
          e.stopPropagation();
          e.target.parentElement.classList.add("hideit");

          setTimeout(function () {
            box.classList.replace("show", "hide");
          }, 500);
        }
      });
    });
  }; // end ssAlertBoxes

  /* Smoothscroll
   * ------------------------------------------------------ */
  const ssSmoothScroll = function () {
    const triggers = document.querySelectorAll(".smoothscroll");

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        const target = trigger.getAttribute("href");

        Jump(target, {
          duration: 1200,
        });
      });
    });
  }; // end ssSmoothScroll

  /* back to top
   * ------------------------------------------------------ */
  const ssBackToTop = function () {
    const pxShow = 900;
    const goTopButton = document.querySelector(".ss-go-top");

    if (!goTopButton) return;

    // Show or hide the button
    if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

    window.addEventListener("scroll", function () {
      if (window.scrollY >= pxShow) {
        if (!goTopButton.classList.contains("link-is-visible"))
          goTopButton.classList.add("link-is-visible");
      } else {
        goTopButton.classList.remove("link-is-visible");
      }
    });
  }; // end ssBackToTop

  // Nav bar animation
  const ssNav = () => {
    const nav = document.querySelector(".js-nav");
    const navLinks = nav.querySelectorAll(".nav__link");
    const slideRect = nav.querySelector(".nav__slider-rect");

    nav.addEventListener("click", (evt) => {
      if (!evt.target.classList.contains("nav__link")) {
        return;
      }
      evt.preventDefault();

      navLinks.forEach((item) => {
        item.classList.remove("nav__link_active");
      });

      if (!evt.target.classList.contains("nav__link_active")) {
        evt.target.classList.add("nav__link_active");
      }

      slideRect.style.transform = `translateX(${evt.target.dataset.transform}%)`;
      filterProjects(evt.target.textContent);
    });
  };

  const ssSendEmail = () => {
    const form = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit-button");

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const emailElement = document.getElementById("email");
      const messageElement = document.getElementById("message");
      const successAlert =
        document.getElementsByClassName("alert-box--success")[0];
      const errorAlert = document.getElementsByClassName("alert-box--error")[0];
      const email = emailElement.value;
      const message = messageElement.value;

      errorAlert.classList.add("hideit", "hide");
      errorAlert.classList.remove("show");
      successAlert.classList.add("hideit", "hide");
      successAlert.classList.remove("show");
      submitButton.classList.add("loading");

      fetch("https://formsubmit.co/ajax/a95d6166302b4ba76533a8c56a73b998", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: email,
          message,
          _template: "box",
          _subject: "Portfolio website client",
        }),
      })
        .then((response) => response.json())
        .then(() => {
          successAlert.firstElementChild.innerHTML = "Mail sent successfully";
          successAlert.classList.remove("hide", "hideit");
          successAlert.classList.add("show");
          emailElement.value = "";
          messageElement.value = "";
        })
        .catch((error) => {
          errorAlert.firstElementChild.innerHTML =
            "Something went wrong. Please try again";
          errorAlert.classList.remove("hide", "hideit");
          errorAlert.classList.add("show");
          console.log(error);
        })
        .finally(() => submitButton.classList.remove("loading"));
    });
  };

  const ssProgressBars = () => {
    document.onscroll = () => {
      var elements = document.getElementsByClassName("progress");

      if (!elements[0].classList.contains("percent80")) {
        var windowHeight = window.innerHeight;
        var elementTop = elements[0].getBoundingClientRect().top;
        var elementVisible = 15.2;

        if (elementTop < windowHeight - elementVisible) {
          elements[0].classList.add("percent80"); // ReactJS
          elements[1].classList.add("percent75"); // NextJs
          elements[2].classList.add("percent80"); // Redux
          elements[3].classList.add("percent75"); // NodeJS
          elements[4].classList.add("percent70"); // Typescript
          elements[5].classList.add("percent75"); // Javascript
        }
      }
    };
  };

  /* initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssParallax();
    ssMoveHeader();
    ssMobileMenu();
    ssScrollSpy();
    // ssSwiper();
    ssLightbox();
    ssAlertBoxes();
    ssSmoothScroll();
    ssBackToTop();
    ssNav();
    ssSendEmail();
    ssProgressBars();
  })();
})(document.documentElement);
