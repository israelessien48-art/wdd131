// ---------------- Product array (id + name) ----------------
const products = [
  { id: "laptop-01", name: "Laptop" },
  { id: "phone-01", name: "Smartphone" },
  { id: "headph-01", name: "Headphones" },
  { id: "spkr-01", name: "Bluetooth Speaker" },
  { id: "watch-01", name: "Smartwatch" },
  { id: "kb-01", name: "Mechanical Keyboard" },
  { id: "mon-01", name: "Monitor" }
];

// Populate the product select element (value is product id per rubric)
function populateProducts() {
  const select = document.getElementById("product");
  if (!select) return;
  // keep placeholder intact
  products.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;      // rubric requires value to be id
    opt.textContent = p.name;
    select.appendChild(opt);
  });
}

// Display review count on review.html
function showReviewCount() {
  const el = document.getElementById("reviewCount");
  if (!el) return;
  const count = Number(localStorage.getItem("reviewCount")) || 0;
  el.textContent = count;
}

// Set lastModified footer text
function setLastModified() {
  const el = document.getElementById("lastModified");
  if (!el) return;
  el.textContent = "Last Modification: " + document.lastModified;
}

// Handle form submit:
// increment localStorage counter, then navigate to review.html (preserving GET)
function attachFormHandler() {
  const form = document.getElementById("reviewForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // basic required checks (product, rating, date)
    const productVal = document.getElementById("product").value;
    const ratingChecked = document.querySelector('input[name="rating"]:checked');
    const dateVal = document.getElementById("installDate").value;

    if (!productVal) {
      document.getElementById("product").reportValidity();
      return;
    }
    if (!ratingChecked) {
      // focus a rating to show validation help
      document.getElementById("rating1").focus();
      return;
    }
    if (!dateVal) {
      document.getElementById("installDate").reportValidity();
      return;
    }

    // increment localStorage counter
    const current = Number(localStorage.getItem("reviewCount")) || 0;
    const next = current + 1;
    localStorage.setItem("reviewCount", next);

    // Build GET query string same as native form behavior
    const params = new URLSearchParams(new FormData(form)).toString();

    // Navigate to review page (preserve query string so behavior mimics GET)
    window.location.href = "review.html" + (params ? "?" + params : "");
  });
}

// DOM ready
document.addEventListener("DOMContentLoaded", function () {
  populateProducts();
  showReviewCount();
  setLastModified();
  attachFormHandler();
});
