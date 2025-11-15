// ====== NATURE DATA ======
const natureItems = [
  { name: "Forest Trails", info: "Explore deep forests full of wildlife and calm energy." },
  { name: "Mountain Peaks", info: "Reach new heights and discover breathtaking views." },
  { name: "Rivers & Streams", info: "Relax by flowing water and enjoy peaceful moments." },
  { name: "Wildlife", info: "Learn about animals that live in our natural world." }
];

// ====== OUTPUT CARDS ======
function loadCards() {
  const container = document.getElementById("natureCards");
  if (!container) return;

  container.innerHTML = natureItems.map(item => `
    <div class="card">
      <h3>${item.name}</h3>
      <p>${item.info}</p>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", loadCards);

// ====== FORM + LOCAL STORAGE ======
const form = document.getElementById("joinForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
      document.getElementById("message").textContent = "Please fill all fields.";
      return;
    }

    const user = { name, email };

    localStorage.setItem("natureUser", JSON.stringify(user));

    document.getElementById("message").textContent =
      `Welcome to Nature Nook, ${name}!`;
  });
}
