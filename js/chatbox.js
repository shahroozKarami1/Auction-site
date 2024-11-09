//! =============================== SWIPER_N-RIGHT ===========================
const n_right = new Swiper(".n_right", {
  slidesPerView: 3,
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
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    250: {
      slidesPerView: 3,
    },
    501: {
      slidesPerView: 4,
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

//! =============================== SHOW_STATUS_CHATBOX ===========================
const chatbox_main = document.querySelector(".chatbox_main"),
  firstMode = document.querySelector(".ch_first_mode_detail"),
  secondMode = document.querySelector(".ch_second_mode_detail"),
  statusBtnInput = document.querySelector(".ch_title.sls_mood input"),
  chatBtnInput = document.querySelector(".ch_title.slc_mood input"),
  statusBtn = document.querySelector(".ch_title.sls_mood"),
  chatBtn = document.querySelector(".ch_title.slc_mood");

chatBtnInput.onclick = () => {
  secondMode.style.display = "block";
  firstMode.style.display = "none";
  chatBtn.classList.add("select_mode");
  statusBtn.classList.remove("select_mode");
};
statusBtnInput.onclick = () => {
  secondMode.style.display = "none";
  firstMode.style.display = "block";
  chatBtn.classList.remove("select_mode");
  statusBtn.classList.add("select_mode");
};

//! =============================== RETURN_HOME ===========================
const fas_home = document.querySelector(".left_tls .fa-home");

fas_home.onclick = () => {
  window.location.href = "../html/profile.html";
};
