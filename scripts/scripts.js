// PRODUCT ARRAY
const products = [
    { id: "fc-1888", name: "Flux Capacitor" },
    { id: "fc-2050", name: "Power Laces" },
    { id: "fs-1987", name: "Self-fitting Jacket" },
    { id: "ds-1985", name: "Hoverboard" }
];

// Populate select menu dynamically
const select = document.querySelector("#product-name");

products.forEach(product => {
    const opt = document.createElement("option");
    opt.value = product.id;       // ID as value
    opt.textContent = product.name; // Name as display
    select.appendChild(opt);
});
