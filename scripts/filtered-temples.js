// === Footer Info ===
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// === Temple Data ===
const temples = [
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, USA",
    dedicated: "1893-04-06",
    area: 253015,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-1.jpg"
  },
  {
    templeName: "Nauvoo Illinois Temple",
    location: "Nauvoo, Illinois, USA",
    dedicated: "2002-06-27",
    area: 54000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/nauvoo-illinois-temple/nauvoo-illinois-temple-1.jpg"
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019-03-10",
    area: 41010,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-1.jpg"
  },
  {
    templeName: "Accra Ghana Temple",
    location: "Accra, Ghana",
    dedicated: "2004-01-11",
    area: 17500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-1.jpg"
  },
  {
    templeName: "Lagos Nigeria Temple",
    location: "Lagos, Nigeria",
    dedicated: "2024-11-01",
    area: 32000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/lagos-nigeria-temple/lagos-nigeria-temple-1.jpg"
  },
  {
    templeName: "Tokyo Japan Temple",
    location: "Tokyo, Japan",
    dedicated: "1980-10-27",
    area: 52590,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-1.jpg"
  },
  {
    templeName: "Paris France Temple",
    location: "Le Chesnay, France",
    dedicated: "2017-05-21",
    area: 44175,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-1.jpg"
  },
  {
    templeName: "Cardston Alberta Temple",
    location: "Cardston, Alberta, Canada",
    dedicated: "1923-08-26",
    area: 88835,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/cardston-alberta-temple/cardston-alberta-temple-1.jpg"
  },
  {
    templeName: "Provo Utah Temple",
    location: "Provo, Utah, USA",
    dedicated: "1972-02-09",
    area: 128325,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/provo-utah-temple/provo-utah-temple-1.jpg"
  },
  {
    templeName: "Cebu City Philippines Temple",
    location: "Cebu City, Philippines",
    dedicated: "2010-06-13",
    area: 29866,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/cebu-city-philippines-temple/cebu-city-philippines-temple-1.jpg"
  }
];

// === Selectors ===
const container = document.querySelector("#temple-list");
const navLinks = document.querySelectorAll("nav a");
const menuButton = document.getElementById("menu");
const navigation = document.querySelector(".navigation");

// === Functions ===
function renderTemples(filteredTemples) {
  container.innerHTML = "";
  filteredTemples.forEach(t => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${t.imageUrl}" alt="${t.templeName}" loading="lazy">
      <h3>${t.templeName}</h3>
      <p><strong>Location:</strong> ${t.location}</p>
      <p><strong>Dedicated:</strong> ${t.dedicated}</p>
      <p><strong>Area:</strong> ${t.area.toLocaleString()} sq ft</p>
    `;
    container.appendChild(card);
  });
}

function filterTemples(filter) {
  let result = temples;
  switch (filter) {
    case "old":
      result = temples.filter(t => new Date(t.dedicated).getFullYear() < 1900);
      break;
    case "new":
      result = temples.filter(t => new Date(t.dedicated).getFullYear() > 2000);
      break;
    case "large":
      result = temples.filter(t => t.area > 90000);
      break;
    case "small":
      result = temples.filter(t => t.area < 10000);
      break;
    default:
      result = temples;
  }
  renderTemples(result);
}

// === Event Listeners ===
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    navLinks.forEach(l => l.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "true");
    const filter = link.dataset.filter;
    filterTemples(filter);
  });
});

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.textContent = navigation.classList.contains("open") ? "✖" : "☰";
});

// === Initial Load ===
renderTemples(temples);
