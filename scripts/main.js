/* scripts/main.js */

// ========== Data (objects & arrays) ==========
const recipes = [
  {
    id: 1,
    name: 'Jollof Rice',
    category: 'Lunch',
    ingredients: ['Rice', 'Tomato', 'Onion', 'Spices'],
    instructions: 'Cook rice with tomato sauce and spices.',
    image: 'images/dish1.jpg'
  },
  {
    id: 2,
    name: 'Egusi Soup',
    category: 'Dinner',
    ingredients: ['Melon Seeds', 'Spinach', 'Meat'],
    instructions: 'Cook melon seeds with spinach and meat.',
    image: 'images/dish2.jpg'
  },
  {
    id: 3,
    name: 'Pounded Yam',
    category: 'Lunch',
    ingredients: ['Yam', 'Water', 'Salt'],
    instructions: 'Boil yam, then pound to desired texture.',
    image: 'images/dish3.jpg'
  }
];

// ========== Helpers ==========
const $ = (sel) => document.querySelector(sel);
const $all = (sel) => Array.from(document.querySelectorAll(sel));

// Escape for attributes
const esc = (s) => String(s).replace(/"/g, '&quot;');

// ========== Render functions ==========
function createCardHTML(item) {
  // template literal used
  return `
    <div class="card" data-id="${item.id}">
      <img src="${esc(item.image)}" alt="${esc(item.name)}" loading="lazy">
      <h3>${item.name}</h3>
      <p><strong>Category:</strong> ${item.category}</p>
      <p>${item.instructions}</p>
      <div style="text-align:center; margin-top:0.5rem;">
        <button type="button" onclick="addFavorite(${item.id})">Add to Favorites</button>
      </div>
    </div>
  `;
}

// Populate featured on homepage (first 3)
function populateFeaturedDishes() {
  const container = document.getElementById('featured');
  if(!container) return;
  container.innerHTML = '';
  const featured = recipes.slice(0, 3);
  featured.forEach(r => {
    container.insertAdjacentHTML('beforeend', createCardHTML(r));
  });
}

// Display recipes (menu)
function displayRecipes(category = 'All') {
  const container = document.getElementById('recipeList');
  if(!container) return;
  container.innerHTML = '';
  const filtered = category === 'All' ? recipes : recipes.filter(r => r.category.toLowerCase() === category.toLowerCase());
  filtered.forEach(r => container.insertAdjacentHTML('beforeend', createCardHTML(r)));
}

// ========== Favorites (localStorage) ==========
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  } catch {
    return [];
  }
}
function setFavorites(list) {
  localStorage.setItem('favorites', JSON.stringify(list));
}
function addFavorite(id) {
  const item = recipes.find(r => r.id === id);
  if(!item) { alert('Recipe not found'); return; }
  const fav = getFavorites();
  if(fav.includes(item.id)) {
    alert(`${item.name} is already in favorites.`);
    return;
  }
  fav.push(item.id);
  setFavorites(fav);
  alert(`${item.name} added to favorites!`);
}

// ========== Forms ==========
function initReservationForm() {
  const form = document.getElementById('reservationForm');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('res-name')?.value || document.getElementById('name')?.value || '';
    const guests = document.getElementById('res-guests')?.value || document.getElementById('guests')?.value || '';
    const date = document.getElementById('res-date')?.value || document.getElementById('date')?.value || '';
    if(!name || !guests || !date) { alert('Please complete the form.'); return; }
    alert(`Thank you ${name}! Your reservation for ${guests} guest(s) on ${date} is confirmed.`);
    form.reset();
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if(!form) return;
  const responseEl = document.getElementById('contactResponse');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const msg = document.getElementById('contact-message').value.trim();
    if(!name || !email || !msg) {
      if(responseEl) responseEl.textContent = 'Please complete all fields.';
      return;
    }
    if(responseEl) responseEl.textContent = `Thank you ${name}! Your message has been sent.`;
    else alert(`Thank you ${name}! Your message has been sent.`);
    form.reset();
  });
}

// ========== Initialization ==========
document.addEventListener('DOMContentLoaded', () => {
  // render featured and menu (menu page will use displayRecipes)
  populateFeaturedDishes();
  displayRecipes('All');
  initReservationForm();
  initContactForm();

  // Add click handlers to filter buttons (if present)
  $all('button[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-cat') || btn.textContent;
      displayRecipes(cat);
    });
  });
});
