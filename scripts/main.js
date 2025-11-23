// main.js — handles greeting, menu, contact form, and featured dishes

const menuItems = [
  { id: 1, name: 'Jollof Rice', price: 12, desc: 'Spicy, rich, and flavorful rice dish.', img: 'images/dish1.jpg' },
  { id: 2, name: 'Egusi Soup', price: 15, desc: 'Delicious melon seed soup with meat or fish.', img: 'images/dish2.jpg' },
  { id: 3, name: 'Pounded Yam', price: 10, desc: 'Perfectly pounded yam to accompany any soup.', img: 'images/dish3.jpg' }
];

// Helper
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// Initialize
function init() {
  renderFeatured();
  renderMenuCards();
  attachHandlers();
  firstVisitAlert();
}

// Render Featured Dishes on homepage
function renderFeatured() {
  const featured = $('#featuredList');
  if(!featured) return;
  featured.innerHTML = menuItems.map(item => `
    <article class="dish-card">
      <img src="${item.img}" alt="${item.name}" loading="lazy">
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <p><strong>$${item.price}</strong></p>
    </article>
  `).join('');
}

// Render Menu page cards
function renderMenuCards() {
  const menuList = $('#menuList');
  if(!menuList) return;
  menuList.innerHTML = menuItems.map(item => `
    <article class="dish-card">
      <img src="${item.img}" alt="${item.name}" loading="lazy">
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <p><strong>$${item.price}</strong></p>
    </article>
  `).join('');
}

// Greet button
function handleGreet() {
  const name = prompt('Enter your name:');
  alert(`Welcome to Nigerian Resort, ${name ? name : "Guest"}!`);
}

// Contact Form submission
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if(!name || !email || !message){
    $('#formMessage').textContent = 'Please fill out all fields.';
    $('#formMessage').style.color = 'red';
    return;
  }

  localStorage.setItem('lastContact', JSON.stringify({ name, email, message, date: new Date() }));
  $('#formMessage').textContent = `Thank you, ${name}! Your message has been sent.`;
  $('#formMessage').style.color = 'green';
  form.reset();
}

// Attach event handlers
function attachHandlers() {
  $('#greetBtn')?.addEventListener('click', handleGreet);
  $('#contactForm')?.addEventListener('submit', handleFormSubmit);
}

// First time visit alert
function firstVisitAlert() {
  if(!localStorage.getItem('visited')){
    alert('Welcome to our restaurant website for the first time!');
    localStorage.setItem('visited', 'true');
  }
}

// Init on DOM ready
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
}else{
  init();
}
