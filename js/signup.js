//! =========================== SING-UP_CHANGE_PAGE =======================
const singUp_bellow = new Swiper(".singUp_bellow", {
  loop: false,
  spaceBetween: 32,
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  /* navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    } */
});

//! ========================= SING-UP_MOBILE,EMAIL-VALIDATOR =========================
function mobile__validating() {
  const singUp_mobile_validator = document.querySelector(".singUp_mobile-validator"),
    signUp_mobile_input_value = document.querySelector(".signUp_mobile-input").value,
    firsterror = document.querySelector(".mobile-validator.firsterror"),
    seconderror = document.querySelector(".mobile-validator.seconderror"),
    thirderror = document.querySelector(".mobile-validator.thirderror"),
    first_error_definition = /\d/,
    second_error_definition = /^09[01239]\d{7}$/;

  singUp_mobile_validator.style.display = "block";

  if (signUp_mobile_input_value.match(first_error_definition)) {
    firsterror.style.opacity = "0";
    seconderror.style.opacity = "0";
  } else {
    firsterror.style.opacity = "1";
  }

  if (signUp_mobile_input_value.match(second_error_definition)) {
    firsterror.style.opacity = "0";
    seconderror.style.opacity = "0";
    thirderror.style.opacity = "1";
  } else {
    seconderror.style.opacity = "1";
    thirderror.style.opacity = "0";
  }

  if (signUp_mobile_input_value == "") {
    firsterror.style.opacity = "0";
    seconderror.style.opacity = "0";
    thirderror.style.opacity = "0";
    singUp_mobile_validator.style.display = "none";
  }
}

function email__validating() {
  const signUp_email_input_value = document.querySelector(".signUp_email-input").value,
    email_accept = document.querySelector(".email-accept"),
    email_reject = document.querySelector(".email-reject"),
    email_filter = /^[^ ]+@+[^ ]+\.[a-z]{1,2}$/;

  if (signUp_email_input_value.match(email_filter)) {
    email_accept.style.opacity = "1";
    email_reject.style.opacity = "0";
  } else {
    email_accept.style.opacity = "0";
    email_reject.style.opacity = "1";
  }

  if (signUp_email_input_value == "") {
    email_accept.style.opacity = "0";
    email_reject.style.opacity = "1";
  }
}

//! =========================== SING-UP_PASS-VALIDATOR =======================
const swiper_pagination = document.querySelector(".swiper-pagination"),
  singUp_page_box_psw = document.querySelector(".singUp_page-box.psw"),
  signUp_password_input = document.querySelector(".signUp_password-input"),
  signUp_password_input_value = document.querySelector(".signUp_password-input").value,
  signUp_password_description = document.querySelector(".signUp_password-description"),
  double_tick = document.querySelector(".double_tick"),
  default_strength_color = document.querySelector(".default-strength-color"),
  strength_color = document.querySelector(".strength-color"),
  strength_text = document.querySelector(".strength-text"),
  camel = document.querySelectorAll(".camel"),
  lowercase = document.querySelector(".camel.lowercase"),
  uppercase = document.querySelector(".camel.uppercase"),
  number = document.querySelector(".camel.number"),
  special = document.querySelector(".camel.special"),
  length = document.querySelector(".camel.length"),
  i_close = document.querySelector(".i_close");

const new_lowerCase = new RegExp("(?=.*[a-z])");
// // or var newlowercase=password_input.value.match(/[a-z]/);

const new_upperCase = new RegExp("(?=.*[A-Z])");
// // or var newnumbers=password_input.value.match(/[0-9]/);

const new_number = new RegExp("(?=.*[0-9])");
// // or var newnumbers=password_input.value.match(/[0-9]/);

const new_special = new RegExp("(?=.*[!@#$%^&*()-])");
// // or var newspecial=password_input.value.match(/[\!\@\#\$\%\^\&\*\(\)\?\-\+\=]/);
// //tip: these character are not allowed to bring in regularexpression  \=\+\_\|\?\.\,\'\"\;\:\~

const new_length = new RegExp("(?=.{8,})");

const new_length2 = new RegExp("(?=.{11,})");

signUp_password_input.addEventListener("focus", () => {
  singUp_page_box_psw.classList.add("showPassContainer");
  double_tick.classList.add("showPassContainer");
  signUp_password_description.classList.add("showPassContainer");
  swiper_pagination.classList.add("showPassContainer");
});
i_close.onclick = () => {
  singUp_page_box_psw.classList.remove("showPassContainer");
  double_tick.classList.remove("showPassContainer");
  signUp_password_description.classList.remove("showPassContainer");
  swiper_pagination.classList.remove("showPassContainer");
};

// define functions for when we have no data
function cleaning() {
  strength_color.style.background = "";
  strength_text.style.color = "";
  strength_text.innerHTML = "-";
}

function set_strong_color_text(color, text) {
  strength_color.style.background = color;
  strength_text.style.color = color;
  strength_text.innerHTML = text;
}

function color_width_value(value) {
  strength_color.style.width = value + "%";
}

function password_validator() {
  let strength;
  if (signUp_password_input.value == "") {
    cleaning();
  }

  if (new_lowerCase.test(signUp_password_input.value) || new_upperCase.test(signUp_password_input.value) || new_number.test(signUp_password_input.value) || new_special.test(signUp_password_input.value) || new_length.test(signUp_password_input.value)) {
    strength = 20;
    set_strong_color_text("red", "خیلی ضعیف");
  }

  if ((new_lowerCase.test(signUp_password_input.value) && new_upperCase.test(signUp_password_input.value)) || (new_lowerCase.test(signUp_password_input.value) && new_number.test(signUp_password_input.value)) || (new_lowerCase.test(signUp_password_input.value) && new_special.test(signUp_password_input.value)) || (new_upperCase.test(signUp_password_input.value) && new_number.test(signUp_password_input.value)) || (new_upperCase.test(signUp_password_input.value) && new_special.test(signUp_password_input.value)) || (new_special.test(signUp_password_input.value) && new_number.test(signUp_password_input.value))) {
    strength = 40;
    set_strong_color_text("rgb(255, 20, 149)", "ضعیف");
  }

  if ((new_lowerCase.test(signUp_password_input.value) && new_upperCase.test(signUp_password_input.value) && new_number.test(signUp_password_input.value) && new_length.test(signUp_password_input.value)) || (new_lowerCase.test(signUp_password_input.value) && new_upperCase.test(signUp_password_input.value) && new_special.test(signUp_password_input.value) && new_length.test(signUp_password_input.value)) || (new_lowerCase.test(signUp_password_input.value) && new_number.test(signUp_password_input.value) && new_special.test(signUp_password_input.value) && new_length.test(signUp_password_input.value)) || (new_upperCase.test(signUp_password_input.value) && new_number.test(signUp_password_input.value) && new_special.test(signUp_password_input.value) && new_length.test(signUp_password_input.value))) {
    strength = 60;
    set_strong_color_text("rgb(250, 134, 25)", "متوسط");
  }
  if (new_lowerCase.test(signUp_password_input.value) && new_number.test(signUp_password_input.value) && new_special.test(signUp_password_input.value) && new_upperCase.test(signUp_password_input.value) && new_length.test(signUp_password_input.value)) {
    strength = 80;
    set_strong_color_text("rgb(159, 253, 7)", "قوی");
  }
  if (new_lowerCase.test(signUp_password_input.value) && new_number.test(signUp_password_input.value) && new_special.test(signUp_password_input.value) && new_upperCase.test(signUp_password_input.value) && new_length.test(signUp_password_input.value) && new_length2.test(signUp_password_input.value)) {
    strength = 100;
    set_strong_color_text("rgb(2, 139, 25)", "خیلی قوی");
  }
  color_width_value(strength);

  if (new_lowerCase.test(signUp_password_input.value)) {
    lowercase.style.color = "#29c50a";
  } else {
    lowercase.style.color = "#02265c";
  }

  if (new_upperCase.test(signUp_password_input.value)) {
    uppercase.style.color = "#29c50a";
  } else {
    uppercase.style.color = "#02265c";
  }

  if (new_number.test(signUp_password_input.value)) {
    number.style.color = "#29c50a";
  } else {
    number.style.color = "#02265c";
  }

  if (new_special.test(signUp_password_input.value)) {
    special.style.color = "#29c50a";
  } else {
    special.style.color = "#02265c";
  }

  if (new_length.test(signUp_password_input.value)) {
    length.style.color = "#29c50a";
  } else {
    length.style.color = "#02265c";
  }
}

const generation = document.querySelector(".generation"),
  btn_generate = document.querySelector(".btn_generate"),
  input_generate = document.querySelector(".input_generate"),
  copy_generate = document.querySelector(".copy_generate"),
  done_generate = document.querySelector(".done_generate");

btn_generate.onclick = () => {
  let pass = "";
  let produce_pass =
    "000011111222233334444555566667777888899990000111112222333344445555666677778888999900001111122223333444455556666777788889999000011111222233334444555566667777888899990000111112222333344445555666677778888999900001111122223333444455556666777788889999abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ00001111122223333444455556666777788889999abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ00001111122223333444455556666777788889999abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ00001111122223333444455556666777788889999abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------!!!!@@@@@###$$S$$%%%%%^^^^&&&&*****(((((())))))------ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let produce_pass_length = 11;
  for (let i = 0; i < produce_pass_length; i++) {
    let rnd = Math.floor(Math.random() * produce_pass.length);
    pass += produce_pass.substring(rnd, rnd + 1);
  }
  input_generate.value = pass;
  done_generate.textContent = "";
};
copy_generate.addEventListener("click", () => {
  if (input_generate.value != "") {
    input_generate.select();
    document.execCommand("copy");
    done_generate.textContent = "کپی انجام شد";
  } else {
    done_generate.textContent = "محتوایی وجود ندارد";
  }
});

//! =============================== POPUP ===========================
const popup = document.querySelector(".popup"),
  button_popup = document.querySelector(".popup button"),
  singUp_bellow2 = document.querySelector(".singUp_bellow");

double_tick.onclick = () => {
  singUp_bellow2.classList.add("drop_popup");
  popup.classList.add("drop_popup");
};
button_popup.onclick = () => {
  singUp_bellow2.classList.remove("drop_popup");
  popup.classList.remove("drop_popup");
  window.location.href = "../index.html";
};

const h4 = document.querySelector(".singUp_header h4");
h4.addEventListener("click", function () {
  window.location.href = "../index.html";
});
