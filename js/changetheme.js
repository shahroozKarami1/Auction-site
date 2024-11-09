//! =========================== CHANGE_THEME =======================

const change_Theme = "change_theme";
const theme_Icon = "ri-sun-line";
const moonButton = document.getElementById("moon-button");

const currentTheme = () => (document.body.classList.contains(change_Theme) ? "dark" : "light");
const currentThemeIcon = () => (moonButton.classList.contains(theme_Icon) ? "ri-moon-line" : "ri-sun-line");

moonButton.addEventListener("click", () => {
  document.body.classList.toggle(change_Theme);
  moonButton.classList.toggle(theme_Icon);
  localStorage.setItem("select_Theme", currentTheme());
  localStorage.setItem("select_Theme_Icon", currentThemeIcon());
});

const chosen_Mode = localStorage.getItem("select_Theme");
const chosen_Mode_Icon = localStorage.getItem("select_Theme_Icon");
if (chosen_Mode) {
  document.body.classList[chosen_Mode === "dark" ? "add" : "remove"](change_Theme);
  moonButton.classList[chosen_Mode_Icon === "ri-moon-line" ? "add" : "remove"](theme_Icon);
}
