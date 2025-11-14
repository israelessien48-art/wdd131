/* Product array (id + name). Option value uses id per rubric. */
const products = [
  { id: "laptop-01", name: "Laptop" },
  { id: "phone-01", name: "Smartphone" },
  { id: "headph-01", name: "Headphones" },
  { id: "spkr-01", name: "Bluetooth Speaker" },
  { id: "watch-01", name: "Smartwatch" },
  { id: "kb-01", name: "Mechanical Keyboard" },
  { id: "mon-01", name: "Monitor" }
];

function populateProductSelect() {
  const sel = document.getElementById("product");
  if (!sel) return;
  products.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;       // value is id (rubric requirement)
    opt.textContent = p.name;
    sel.appendChild(opt);
  });
}

function setLastModified() {
  const el = document.getElementById("lastModified");
  if (!el) return;
  el.textContent = "Last Modification: " + document.lastModified;
}

function showReviewCount() {
  const el = document.getElementById("reviewCount");
  if (!el) return;
  const count = Number(localStorage.getItem("reviewCount")) || 0;
  el.textContent = count;
}

// Attach submit handler: validate required fields, increment counter, then redirect
function attachFormHandler() {
  const form = document.getElementById("reviewForm");
  if (!form) return;

  form.addEventListener("submit", function (ev) {
    // prevent default so we increment localStorage first
    ev.preventDefault();

    const productVal = document.getElementById("product").value;
    const ratingChecked = document.querySelector('input[name="rating"]:checked');
    const dateVal = document.getElementById("installDate").value;

    if (!productVal) {
      document.getElementById("product").reportValidity();
      return;
    }
    if (!ratingChecked) {
      // focus first rating to show user something is required
      document.getElementById("r1").focus();
      return;
    }
    if (!dateVal) {
      document.getElementById("installDate").reportValidity();
      return;
    }

    // increment counter
    const current = Number(localStorage.getItem("reviewCount")) || 0;
    localStorage.setItem("reviewCount", current + 1);

    // Build GET query string from form and navigate to review.html
    const params = new URLSearchParams(new FormData(form)).toString();
    window.location.href = "review.html" + (params ? "?" + params : "");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  populateProductSelect();
  setLastModified();
  attachFormHandler();
  showReviewCount(); // harmless on form page; shows count on review page
});
