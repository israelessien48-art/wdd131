/* js/main.js
   - Multiple functions
   - Arrays/objects + methods
   - Template literals
   - DOM manipulation and events
   - localStorage usage
*/

const menuItems = [
  { id: 1, name: 'Jollof Rice', price: 12, desc: 'Spicy, tomato-based rice with plantain.', img: 'images/dish1.jpg' },
  { id: 2, name: 'Egusi Soup', price: 15, desc: 'Melon-seed soup served with choice of protein.', img: 'images/dish2.jpg' },
  { id: 3, name: 'Pounded Yam', price: 10, desc: 'Smooth pounded yam to pair with your soup.', img: 'images/dish3.jpg' }
];

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

function init() {
  renderFeaturedCards();
  renderMenuPage();
  attachHandlers();
  restoreContactPrefill();
  firstVisitNotice();
}

/* Render the featured cards on homepage (if present) */
function renderFeaturedCards() {
  const container = $('#featuredList');
  if(!container) return;
  container.innerHTML = menuItems.map(item => cardHTML(item)).join('');
}

/* Render menu page cards (menu.html) */
function renderMenuPage() {
  const menuGrid = $('#menuGrid') || $('#menuList') || $('#menuListSection');
  if(!menuGrid) return;
  menuGrid.innerHTML = menuItems.map(item => cardHTML(item)).join('');
}

/* Card template (template literal) */
function cardHTML(item) {
  return `
    <article class="dish-card" role="listitem" data-id="${item.id}">
      <img src="${item.img}" alt="${item.name}" loading="lazy">
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <p><strong>$${item.price}</strong></p>
      <div style="padding:.5rem;">
        <button class="btn choose" data-id="${item.id}">Choose</button>
      </div>
    </article>
  `;
}

/* Handle choose button */
function handleChoose(e) {
  const btn = e.target.closest('.choose');
  if(!btn) return;
  const id = Number(btn.dataset.id);
  const item = menuItems.find(m => m.id === id);
  if(!item) return;
  localStorage.setItem('preferredDish', JSON.stringify(item));
  alert(`${item.name} saved as your preferred dish.`);
}

/* Greet user */
function handleGreet() {
  const name = prompt('Enter your name:');
  if(name && name.trim().length) {
    localStorage.setItem('visitorName', name.trim());
    alert(`Welcome to Nigerian Resort, ${name.trim()}!`);
  } else {
    alert('Welcome to Nigerian Resort, Guest!');
  }
}

/* Contact form submission */
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if(!name || !email || !message) {
    showFormMessage('Please complete all fields.', true);
    return;
  }
  if(!email.includes('@')) {
    showFormMessage('Please enter a valid email address.', true);
    return;
  }

  const obj = { name, email, message, date: new Date().toISOString() };
  localStorage.setItem('lastContact', JSON.stringify(obj));
  showFormMessage(`Thank you, ${name}! We'll be in touch.`, false);
  form.reset();
}

/* Show form message */
function showFormMessage(txt, isError) {
  const el = $('#formMessage');
  if(!el) return;
  el.textContent = txt;
  el.style.color = isError ? 'crimson' : 'green';
}

/* Restore contact form prefill from localStorage */
function restoreContactPrefill() {
  const raw = localStorage.getItem('lastContact');
  if(!raw) return;
  try {
    const data = JSON.parse(raw);
    const form = $('#contactForm');
    if(form) {
      form.name.value = data.name || '';
      form.email.value = data.email || '';
    }
  } catch(e) { /* ignore */ }
}

/* Set up event listeners */
function attachHandlers() {
  $('#greetBtn')?.addEventListener('click', handleGreet);
  $$('.choose').forEach(btn => btn.addEventListener('click', handleChoose));
  $('#menuGrid')?.addEventListener('click', handleChoose);
  $('#menuList')?.addEventListener('click', handleChoose);
  $('#menuGrid')?.addEventListener('click', handleChoose);
  $('#contactForm')?.addEventListener('submit', handleFormSubmit);
}

/* First visit alert (localStorage flag) */
function firstVisitNotice() {
  if(!localStorage.getItem('visited')) {
    alert('Welcome to our restaurant website for the first time!');
    localStorage.setItem('visited','true');
  }
}

/* Initialize when DOM ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* Expose for debugging (optional) */
window.__NigerianResort = { menuItems };
