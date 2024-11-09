//! =============================== SWIPER ===========================
const showP_hld = document.querySelector(".showP_hld.tyu");
const c_lock = document.querySelectorAll(".c_lock");
const o_lock = document.querySelectorAll(".o_lock");
const show_overall = document.querySelectorAll(".show_overall");
const swiper_wrapper = document.querySelectorAll(".swiper-wrapper");

const c_lock_maskuni = document.querySelector(".shP-maskuni .c_lock");
const o_lock_maskuni = document.querySelector(".shP-maskuni .o_lock");
const c_lock_edari = document.querySelector(".shP-edari .c_lock");
const o_lock_edari = document.querySelector(".shP-edari .o_lock");
const c_lock_tejari = document.querySelector(".shP-tejari .c_lock");
const o_lock_tejari = document.querySelector(".shP-tejari .o_lock");
const c_lock_keshavarzi = document.querySelector(".shP-keshavarzi .c_lock");
const o_lock_keshavarzi = document.querySelector(".shP-keshavarzi .o_lock");

const openSwiper = (jj) => {
  c_lock[jj].style.display = "block" ? "none" : "block";
  o_lock[jj].style.display = "none" ? "block" : "none";
  show_overall[jj].classList.remove("deactivate_w");
};
c_lock.forEach((i, j) => {
  i.addEventListener("click", function () {
    openSwiper(j);
  });
});

const closeSwiper = (mm) => {
  c_lock[mm].style.display = "none" ? "block" : "none";
  o_lock[mm].style.display = "block" ? "none" : "block";
  show_overall[mm].classList.add("deactivate_w");
};
o_lock.forEach((k, m) => {
  k.addEventListener("click", function () {
    closeSwiper(m);
  });
});

c_lock_maskuni.addEventListener("click", function () {
  const shP_maskuni = new Swiper(".shP-maskuni", {
    slidesPerView: 2,
    spaceBetween: 22,
    loop: false,
    // centerSlide: "true",
    // fade: "true",
    grabCursor: "true",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      290: {
        slidesPerView: 2,
      },
      490: {
        slidesPerView: 3,
      },
      630: {
        slidesPerView: 4,
      },
      769: {
        slidesPerView: 5,
      },
      1025: {
        slidesPerView: 6,
      },
      1150: {
        slidesPerView: 7,
      },
      1450: {
        slidesPerView: 8,
      },
      1750: {
        slidesPerView: 9,
      },
      2000: {
        slidesPerView: 10,
      },
    },
  });
});
c_lock_edari.addEventListener("click", function () {
  const shP_edari = new Swiper(".shP-edari", {
    slidesPerView: 2,
    spaceBetween: 22,
    loop: false,
    // centerSlide: "true",
    // fade: "true",
    grabCursor: "true",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      290: {
        slidesPerView: 2,
      },
      490: {
        slidesPerView: 3,
      },
      630: {
        slidesPerView: 4,
      },
      769: {
        slidesPerView: 5,
      },
      1025: {
        slidesPerView: 6,
      },
      1150: {
        slidesPerView: 7,
      },
      1450: {
        slidesPerView: 8,
      },
      1750: {
        slidesPerView: 9,
      },
      2000: {
        slidesPerView: 10,
      },
    },
  });
});
c_lock_tejari.addEventListener("click", function () {
  const shP_tejari = new Swiper(".shP-tejari", {
    slidesPerView: 2,
    spaceBetween: 22,
    loop: false,
    // centerSlide: "true",
    // fade: "true",
    grabCursor: "true",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      290: {
        slidesPerView: 2,
      },
      490: {
        slidesPerView: 3,
      },
      630: {
        slidesPerView: 4,
      },
      769: {
        slidesPerView: 5,
      },
      1025: {
        slidesPerView: 6,
      },
      1150: {
        slidesPerView: 7,
      },
      1450: {
        slidesPerView: 8,
      },
      1750: {
        slidesPerView: 9,
      },
      2000: {
        slidesPerView: 10,
      },
    },
  });
});
c_lock_keshavarzi.addEventListener("click", function () {
  const shP_keshavarzi = new Swiper(".shP-keshavarzi", {
    slidesPerView: 2,
    spaceBetween: 22,
    loop: false,
    // centerSlide: "true",
    // fade: "true",
    grabCursor: "true",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      290: {
        slidesPerView: 2,
      },
      490: {
        slidesPerView: 3,
      },
      630: {
        slidesPerView: 4,
      },
      769: {
        slidesPerView: 5,
      },
      1025: {
        slidesPerView: 6,
      },
      1150: {
        slidesPerView: 7,
      },
      1450: {
        slidesPerView: 8,
      },
      1750: {
        slidesPerView: 9,
      },
      2000: {
        slidesPerView: 10,
      },
    },
  });
});

//! =============================== DESCRIPTION ===========================
const desc_ig = document.querySelectorAll(".showP_det i");
const showP_close = document.querySelectorAll(".showP_des .showP-close");
const showP_des = document.querySelector(".showP_des");

desc_ig.forEach((h) => {
  h.addEventListener("click", function () {
    showP_des.classList.add("show-on_descriptons");
    show_overall.forEach((h2) => {
      h2.classList.add("show-on_descriptons");
    });
    desc_ig.forEach((h3) => {
      h3.classList.add("show-on_descriptons");
    });
  });
});

showP_close.forEach((sc) => {
  sc.addEventListener("click", function () {
    showP_des.classList.remove("show-on_descriptons");
    show_overall.forEach((h2) => {
      h2.classList.remove("show-on_descriptons");
    });
    desc_ig.forEach((h3) => {
      h3.classList.remove("show-on_descriptons");
    });
  });
});

const images_container = new Swiper(".images_container", {
  slidesPerView: 2,
  spaceBetween: 35,
  loop: false,
  // centerSlide: "true",
  // fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".imgs_hld_p",
    clickable: true,
    dynamicBullets: true,
  },
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    290: {
      slidesPerView: 2,
    },
    350: {
      slidesPerView: 3,
    },
    490: {
      slidesPerView: 4,
      // noSwiping: false,
      // allowSlidePrev: false,
      // allowSlideNext: false,
    },
    630: {
      slidesPerView: 5,
    },
    769: {
      slidesPerView: 6,
    },
    1025: {
      slidesPerView: 7,
    },
    1150: {
      slidesPerView: 8,
    },
    1450: {
      slidesPerView: 9,
    },
    1750: {
      slidesPerView: 10,
    },
    2000: {
      slidesPerView: 11,
    },
  },
});

//! =============================== SHOW_IMAGES_ON_HOLDER ===========================
const des_img_hld = document.querySelector(".des_img_hld");
const des_img_hld_img = document.querySelector(".des_img_hld img");
const img_slide_img = document.querySelectorAll(".imgs_hld .swiper-slide img");

const changImages = (cc) => {
  des_img_hld_img.src = img_slide_img[cc].src;
};
img_slide_img.forEach((b, c) => {
  b.onclick = () => {
    changImages(c);
  };
});

const h4 = document.querySelector(".showProduct_main h4");
h4.addEventListener("click", function () {
  window.location.href = "../../index.html";
});
