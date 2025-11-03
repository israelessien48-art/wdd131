// ✅ Temple Data Array
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x250/accra-ghana-temple-lds-856932-wallpaper.jpg",
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-exterior-1951879-wallpaper.jpg",
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake/400x250/salt-lake-temple-lds-882383-wallpaper.jpg",
  },
];

// ✅ DOM Reference
const album = document.querySelector(".album");

// ✅ Function to Display Temples
function displayTemples(filteredTemples) {
  album.innerHTML = ""; // clear previous cards
  filteredTemples.forEach((temple) => {
    const card = document.createElement("figure");
    card.innerHTML = `
      <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
      <figcaption>
        <h3>${temple.templeName}</h3>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
      </figcaption>
    `;
    album.appendChild(card);
  });
}


// ✅ Default (Show all)
displayTemples(temples);

// ✅ Filtering Functions
const oldTemples = () => temples.filter((t) => parseInt(t.dedicated.split(",")[0]) < 1900);
const newTemples = () => temples.filter((t) => parseInt(t.dedicated.split(",")[0]) > 2000);
const largeTemples = () => temples.filter((t) => t.area > 90000);
const smallTemples = () => temples.filter((t) => t.area < 10000);

// ✅ Event Listeners for Navigation (use data-filter attributes)
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const filter = link.dataset.filter;

    // remove active state from all
    navLinks.forEach((l) => l.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "true");

    switch (filter) {
      case "old":
        displayTemples(oldTemples());
        break;
      case "new":
        displayTemples(newTemples());
        break;
      case "large":
        displayTemples(largeTemples());
        break;
      case "small":
        displayTemples(smallTemples());
        break;
      default:
        displayTemples(temples);
        break;
    }

    // close menu if on mobile
    navigation.classList.remove("open");
    menuButton.textContent = "☰";
  });
});

// ✅ Footer Info
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = new Date(
  document.lastModified
).toLocaleString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

// ✅ Hamburger Menu Toggle
const menuButton = document.getElementById("menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.textContent = navigation.classList.contains("open") ? "✖" : "☰";
});
