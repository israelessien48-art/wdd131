/* scripts/main.js
   - Renders featured dishes on the homepage
   - Renders recipe list on menu.html
   - Filtering, favorites (localStorage), forms
   - Uses template literals, arrays, objects, array methods, conditional branching
*/

const recipes = [
  {
    id: 1,
    name: 'Jollof Rice',
    category: 'breakfast',
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

// simple helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const esc = s => String(s).replace(/"/g, '&quot;');

// build HTML card (used for menu and featured)
function cardHTML(item) {
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

// populate featured (homepage) — uses first 3 items
function populateFeatured() {
  const container = document.querySelector('.dish-cards');
  if(!container) return;
  container.innerHTML = '';
  recipes.slice(0,3).forEach(r => container.insertAdjacentHTML('beforeend', cardHTML(r)));
}

// render menu list (menu.html)
function displayRecipes(category = 'All') {
  const container = document.getElementById('recipeList');
  if(!container) return;
  container.innerHTML = '';
  const filtered = category === 'All'
    ? recipes
    : recipes.filter(r => r.category.toLowerCase() === category.toLowerCase());
  filtered.forEach(r => container.insertAdjacentHTML('beforeend', cardHTML(r)));
}

// filtering function (global for inline buttons)
function filterRecipes(category) {
  displayRecipes(category);
}

// favorites using localStorage
function addFavorite(id) {
  const item = recipes.find(r => r.id === id);
  if(!item) { alert('Recipe not found'); return; }
  const key = 'favorites';
  let list;
  try { list = JSON.parse(localStorage.getItem(key) || '[]'); } catch { list = []; }
  if(list.includes(item.id)) {
    alert(`${item.name} is already in favorites.`);
    return;
  }
  list.push(item.id);
  localStorage.setItem(key, JSON.stringify(list));
  alert(`${item.name} added to favorites.`);
}

// reservation form handler
function initReservation() {
  const form = document.getElementById('reservationForm');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('res-name').value.trim();
    const email = document.getElementById('res-email').value.trim();
    const date = document.getElementById('res-date').value;
    const guests = document.getElementById('res-guests').value;
    if(!name || !email || !date || !guests) {
      alert('Please complete all fields.');
      return;
    }
    alert(`Thank you ${name}! Your reservation for ${guests} guest(s) on ${date} is confirmed.`);
    form.reset();
  });
}

// contact form handler
function initContact() {
  const form = document.getElementById('contactForm');
  if(!form) return;
  const resp = document.getElementById('contactResponse');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const msg = document.getElementById('contact-message').value.trim();
    if(!name || !email || !msg) {
      if(resp) resp.textContent = 'Please complete all fields.';
      return;
    }
    if(resp) resp.textContent = `Thank you ${name}! Your message has been sent.`;
    else alert(`Thank you ${name}! Your message has been sent.`);
    form.reset();
  });
}

// init
document.addEventListener('DOMContentLoaded', () => {
  populateFeatured();
  displayRecipes('All');
  initReservation();
  initContact();
});
