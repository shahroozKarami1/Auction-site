//! =========================== IMAGE-PROFILE =======================
const img_profile = document.querySelector(".img_profile"),
  icon_camera = document.querySelector(".icons_cam .fa-camera"),
  img_profile_input = document.querySelector(".img_profile-input"),
  img_profile_accept = document.querySelector(".fa-check-circle"),
  img_profile_reject = document.querySelector(".fa-minus-circle");

icon_camera.onclick = () => {
  img_profile_input.click();
};

img_profile_input.onchange = (e) => {
  const newFile = e.target.files[0];
  if (newFile.type.match("image")) {
    const newFileReader = new FileReader();
    newFileReader.addEventListener("load", function () {
      const newSrc = newFileReader.result;
      img_profile.src = newSrc;
      setTimeout(() => {
        img_profile_accept.style.opacity = "1";
        img_profile_reject.style.opacity = "0";
      }, 1000);
      setTimeout(() => {
        img_profile_accept.style.opacity = "0";
        img_profile_reject.style.opacity = "0";
      }, 3000);
    });
    newFileReader.readAsDataURL(newFile);
  } else {
    img_profile.src = "../img/overall/avatar3.jpg";
    setTimeout(() => {
      img_profile_reject.style.opacity = "1";
      img_profile_accept.style.opacity = "0";
    }, 1000);
    setTimeout(() => {
      img_profile_reject.style.opacity = "0";
      img_profile_accept.style.opacity = "0";
    }, 3000);
  }
};

const h4 = document.querySelector(".header_profile h4");
h4.addEventListener("click", function () {
  window.location.href = "../index.html";
});
