// Data (objects/arrays used)
const recipes = [
  {
    name: 'Jollof Rice',
    category: 'Lunch',
    ingredients: ['Rice', 'Tomato', 'Onion', 'Spices'],
    instructions: 'Cook rice with tomato sauce and spices.',
    image: 'images/dish1.jpg'
  },
  {
    name: 'Egusi Soup',
    category: 'Dinner',
    ingredients: ['Melon Seeds', 'Spinach', 'Meat'],
    instructions: 'Cook melon seeds with spinach and meat.',
    image: 'images/dish2.jpg'
  },
  {
    name: 'Pounded Yam',
    category: 'Lunch',
    ingredients: ['Yam', 'Water', 'Salt'],
    instructions: 'Boil yam, then pound to desired texture.',
    image: 'images/dish3.jpg'
  },
  {
    name: 'Suya',
    category: 'Dinner',
    ingredients: ['Beef', 'Spices', 'Oil'],
    instructions: 'Skewer and grill beef with spice mix.',
    image: 'images/dish1.jpg' // reuse image if needed
  }
];

// Helper: safe text for attributes
function esc(s){ return String(s).replace(/"/g, '&quot;'); }

// Populate featured dishes on index.html
function populateFeaturedDishes(){
  const container = document.getElementById('dishCards');
  if(!container) return;
  container.innerHTML = '';
  // use first 3 recipes as featured
  const featured = recipes.slice(0,3);
  featured.forEach(r => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${esc(r.image)}" alt="${esc(r.name)}" loading="lazy">
      <h3>${r.name}</h3>
      <p>${r.instructions}</p>
    `;
    container.appendChild(div);
  });
}

// Display recipes (for menu.html)
function displayRecipes(category = 'All'){
  const container = document.getElementById('recipeList');
  if(!container) return;
  container.innerHTML = '';
  const filtered = category === 'All' ? recipes : recipes.filter(r => r.category.toLowerCase() === category.toLowerCase());
  filtered.forEach(r => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${esc(r.image)}" alt="${esc(r.name)}" loading="lazy">
      <h3>${r.name}</h3>
      <p><strong>Category:</strong> ${r.category}</p>
      <p><strong>Ingredients:</strong> ${r.ingredients.join(', ')}</p>
      <p><strong>Instructions:</strong> ${r.instructions}</p>
      <button type="button" onclick="addFavorite('${esc(r.name)}')">Add to Favorites</button>
    `;
    container.appendChild(div);
  });
}

// Filter helper (called from inline onclicks)
function filterRecipes(category){
  displayRecipes(category);
}

// Favorites saved to localStorage
function addFavorite(name){
  const key = 'favorites';
  let list = JSON.parse(localStorage.getItem(key) || '[]');
  if(!list.includes(name)){
    list.push(name);
    localStorage.setItem(key, JSON.stringify(list));
    alert(`${name} added to favorites!`);
  } else {
    alert(`${name} is already in favorites.`);
  }
}

// Forms handling
function initForms(){
  // Reservation form (index)
  const resForm = document.getElementById('reservationForm');
  if(resForm){
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('res-name')?.value || document.getElementById('name')?.value || '';
      const guests = document.getElementById('res-guests')?.value || document.getElementById('guests')?.value || '';
      const date = document.getElementById('res-date')?.value || document.getElementById('date')?.value || '';
      alert(`Thank you ${name}! Your reservation for ${guests} guest(s) on ${date} is confirmed.`);
      resForm.reset();
    });
  }

  // Contact form (contact page)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || document.getElementById('name')?.value || '';
      const responseEl = document.getElementById('contactResponse');
      // simple confirmation
      if(responseEl) responseEl.textContent = `Thank you ${name}! Your message has been sent.`;
      else alert(`Thank you ${name}! Your message has been sent.`);
      contactForm.reset();
    });
  }
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  populateFeaturedDishes();
  displayRecipes('All'); // if on menu page this will render, otherwise no-op
  initForms();
});
