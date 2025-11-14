// PRODUCT ARRAY
const products = [
    { id: "fc-1888", name: "Flux Capacitor" },
    { id: "fc-2050", name: "Power Laces" },
    { id: "fs-1987", name: "Self-fitting Jacket" },
    { id: "ds-1985", name: "Hoverboard" }
];

// Populate select menu dynamically
const select = document.querySelector("#product-name");
if (select) {
    products.forEach(product => {
        const opt = document.createElement("option");
        opt.value = product.id;       // ID as value
        opt.textContent = product.name; // Name as display
        select.appendChild(opt);
    });
}

// Track review count and last modified
const lastModElem = document.getElementById("lastModified");
if(lastModElem) {
    lastModElem.textContent = document.lastModified;
}

const countElem = document.getElementById("count");
if(countElem) {
    let count = Number(localStorage.getItem("reviewCount")) || 0;
    count++;
    localStorage.setItem("reviewCount", count);
    countElem.textContent = count;
}
