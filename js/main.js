//! =========================== HEADER CLASSES =======================
const nav = document.querySelector(".nav"),
  nav__search_click = document.querySelector(".nav__search-click"),
  nav__city__title_name = document.querySelector(".nav__city__title-name"),
  nav__city__title_icon = document.querySelector(".nav__city__title-icon"),
  main_section = document.querySelector(".main_section"),
  nav__city__container = document.querySelector(".nav__city__container");

nav__search_click.addEventListener("click", function () {
  nav.classList.toggle("shift-right");
  nav__city__container.classList.remove("city-height");
  main_section.classList.toggle("deactive-mainSection");
});

nav__city__title_name.addEventListener("click", function () {
  nav__city__container.classList.toggle("city-height");
});

nav__city__title_icon.addEventListener("click", function () {
  nav__city__container.classList.toggle("city-height");
});

//replace the name of city in input city search
const nav__city__input = document.querySelector(".nav__city__input");
const nav__city_name_option = document.querySelectorAll(".nav__city-name-option");

nav__city_name_option.forEach((op) => {
  op.addEventListener("click", function () {
    nav__city__title_name.innerHTML = op.querySelector("label").innerHTML;
    nav__city__container.classList.remove("city-height");
  });
});

//finding word on input city search
nav__city__input.addEventListener("keyup", function (e) {
  findingWord(e.target.value);
});

const findingWord = (e) => {
  e = e.toLowerCase();
  nav__city_name_option.forEach((nameCity) => {
    const nameCity_label = nameCity.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (nameCity_label.indexOf(e) != -1) {
      nameCity.style.display = "block";
    } else {
      nameCity.style.display = "none";
    }
  });
};

//! =========================== ARU_DETAILS =======================
const aru_title = document.querySelectorAll(".aru_title"),
  aru_detail_close = document.querySelectorAll(".aru_detail-close i"),
  aru_detail = document.querySelectorAll(".aru_detail"),
  main_aru2_li = document.querySelectorAll(".main_aru2 li");

const pointer_event = () => {
  main_aru2_li.forEach((main2) => {
    main2.classList.toggle("pointerEvent");
  });
};
const show_aru_detail = (e) => {
  aru_detail[e].classList.add("showAruDetail");
};
const hide_aru_title = () => {
  aru_title.forEach((at) => {
    at.classList.add("hideAruTitle");
  });
};
aru_title.forEach((i, j) => {
  i.onclick = () => {
    show_aru_detail(j);
    hide_aru_title();
    pointer_event();
  };
});

const deactive_pointer_event = () => {
  main_aru2_li.forEach((main2) => {
    main2.classList.remove("pointerEvent");
  });
};
const remove_aru_detail = (ee) => {
  aru_detail[ee].classList.remove("showAruDetail");
};
const show_aru_title = () => {
  aru_title.forEach((at) => {
    at.classList.remove("hideAruTitle");
  });
};
aru_detail_close.forEach((f, g) => {
  f.onclick = () => {
    remove_aru_detail(g);
    show_aru_title();
    deactive_pointer_event();
  };
});

//! =========================== SIGN_IN =======================
const sign_in_detail = document.querySelector(".sign_in-detail"),
  aru2_re_aru_si = document.querySelector(".aru2_re.aru_si"),
  sign_in_close = document.querySelector(".sign_ing-close"),
  main_aru2 = document.querySelector(".main_aru2");

aru2_re_aru_si.onclick = () => {
  sign_in_detail.classList.add("showSingIn");
  main_aru2.classList.add("showSingIn");
  aru_title.forEach((at) => {
    at.classList.add("hideAruTitle");
  });
};

sign_in_close.onclick = () => {
  sign_in_detail.classList.remove("showSingIn");
  main_aru2.classList.remove("showSingIn");
  aru_title.forEach((at) => {
    at.classList.remove("hideAruTitle");
  });
};

//! =========================== SIGN_IN_PASS_EYE =======================
const eye_one = document.querySelector(".eye_one"),
  eye_two = document.querySelector(".eye_two"),
  input_pass = document.querySelector(".sign_in-info .input_pass");

input_pass.addEventListener("focus", function () {
  eye_one.style.display = "block";
  eye_one.onclick = () => {
    input_pass.setAttribute("type", "text");
    eye_two.style.display = "block";
    eye_one.style.display = "none";
  };

  eye_two.onclick = () => {
    input_pass.setAttribute("type", "password");
    eye_two.style.display = "none";
    eye_one.style.display = "block";
  };
});

//! =========================== SIGN_IN_FORGET_PASS =======================
const forgetPassContainer = document.querySelector(".sign_in-forget-pass"),
  forgetPassLink = document.querySelector(".sign_in-forget-pass a"),
  forgetPassPage = document.querySelector(".sign_in-forget-pass-page"),
  sing_in_info = document.querySelector(".sign_in-info"),
  sing_in_btn_arrive = document.querySelector(".sign_in-btn-arrive"),
  sing_in_register = document.querySelector(".sign_in-register"),
  sign_in_detail_h3 = document.querySelector(".sign_in-detail h3"),
  sing_ing_close = document.querySelector(".sign_ing-close"),
  sing_ing_close_i = document.querySelector(".sign_ing-close i"),
  forget_pass_page_close = document.querySelector(".sign_in-forget-pass-page i"),
  sing_in_forget_pass_submit = document.querySelector(".sign_in-forget-pass-submit"),
  sing_in_forget_pass_input = document.querySelector(".sign_in-forget-pass-input"),
  sing_in_forget_pass_span = document.querySelector(".sign_in-forget-pass span");

forgetPassLink.addEventListener("click", function () {
  forgetPassContainer.classList.add("showForgetPage");
  sing_in_info.style.opacity = "0.4";
  forgetPassLink.style.opacity = "0.4";
  sing_in_btn_arrive.style.opacity = "0.4";
  sing_in_register.style.opacity = "0.4";
  sign_in_detail_h3.style.opacity = "0.4";
  sing_ing_close_i.style.opacity = "0.4";

  sing_in_info.style.pointerEvents = "none";
  forgetPassLink.style.pointerEvents = "none";
  sing_in_btn_arrive.style.pointerEvents = "none";
  sing_in_register.style.pointerEvents = "none";
  sign_in_detail_h3.style.pointerEvents = "none";
  sing_ing_close_i.style.pointerEvents = "none";

  sing_ing_close.style.pointerEvents = "none";

  main_aru2_li.forEach((li2) => {
    li2.style.opacity = "0.4";
    li2.style.pointerEvents = "none";
  });
});

forget_pass_page_close.addEventListener("click", function () {
  forgetPassContainer.classList.remove("showForgetPage");
  sing_in_info.style.opacity = "1";
  forgetPassLink.style.opacity = "1";
  sing_in_btn_arrive.style.opacity = "1";
  sing_in_register.style.opacity = "1";
  sign_in_detail_h3.style.opacity = "1";
  sing_ing_close_i.style.opacity = "1";

  sing_in_info.style.pointerEvents = "visible";
  forgetPassLink.style.pointerEvents = "visible";
  sing_in_btn_arrive.style.pointerEvents = "visible";
  sing_in_register.style.pointerEvents = "visible";
  sign_in_detail_h3.style.pointerEvents = "visible";
  sing_ing_close_i.style.pointerEvents = "visible";

  sing_ing_close.style.pointerEvents = "visible";

  main_aru2_li.forEach((li2) => {
    li2.style.opacity = "1";
    li2.style.pointerEvents = "visible";
  });

  sing_in_forget_pass_input.value = "";
});

sing_in_forget_pass_submit.addEventListener("click", function () {
  if (sing_in_forget_pass_input.value !== "") {
    setTimeout(() => {
      sing_in_forget_pass_span.style.display = "block";
    }, 1500);

    setTimeout(() => {
      sing_in_forget_pass_span.style.display = "none";

      forgetPassContainer.classList.remove("showForgetPage");
      sing_in_info.style.opacity = "1";
      forgetPassLink.style.opacity = "1";
      sing_in_btn_arrive.style.opacity = "1";
      sing_in_register.style.opacity = "1";
      sign_in_detail_h3.style.opacity = "1";
      sing_ing_close_i.style.opacity = "1";

      sing_in_info.style.pointerEvents = "visible";
      forgetPassLink.style.pointerEvents = "visible";
      sing_in_btn_arrive.style.pointerEvents = "visible";
      sing_in_register.style.pointerEvents = "visible";
      sign_in_detail_h3.style.pointerEvents = "visible";
      sing_ing_close_i.style.pointerEvents = "visible";

      sing_ing_close.style.pointerEvents = "visible";

      main_aru2_li.forEach((li2) => {
        li2.style.opacity = "1";
        li2.style.pointerEvents = "visible";
      });

      sing_in_forget_pass_input.value = "";
    }, 4500);
  }
});
