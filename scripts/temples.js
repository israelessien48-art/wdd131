// ✅ Display current year
document.getElementById("year").textContent = new Date().getFullYear();

// ✅ Display last modified date/time
document.getElementById("lastModified").textContent = new Date(document.lastModified).toLocaleString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
// ✅ Hamburger menu toggle
const menuButton = document.getElementById("menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  // Change button symbol between ☰ and ✖
  menuButton.textContent = navigation.classList.contains("open") ? "✖" : "☰";
});
