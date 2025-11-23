const menuItems = [
  { id: 1, name: 'Jollof Rice', price: 12, desc: 'Spicy, rich tomato rice. Served with plantain or salad.', img: 'images/dish1.jpg' },
  { id: 2, name: 'Egusi Soup', price: 15, desc: 'Melon seed soup with choice of meat or fish.', img: 'images/dish2.jpg' },
  { id: 3, name: 'Pounded Yam', price: 10, desc: 'Smooth pounded yam to pair with soups.', img: 'images/dish3.jpg' }
];

function $(selector){ return document.querySelector(selector); }
function $all(selector){ return Array.from(document.querySelectorAll(selector)); }

function init(){
  renderMenu();
  renderFeatured();
  restoreContactPrefill();
  attachUIHandlers();
  firstTimeVisitGreeting();
}

function renderMenu(){
  const menuList = $('#menuList');
  if(!menuList) return;
  menuList.innerHTML = '';
  menuItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'menu-item';
    li.innerHTML = `
      <div>
        <div class="name">${item.name}</div>
        <div class="desc">${item.desc}</div>
      </div>
      <div>
        <div class="price">$${item.price}</div>
        <button class="btn choose" data-id="${item.id}" aria-label="Choose ${item.name}">CHOOSE</button>
      </div>
    `;
    menuList.appendChild(li);
  });
  $all('.choose').forEach(btn => btn.addEventListener('click', (e) => {
    const id = Number(e.currentTarget.dataset.id);
    chooseDish(id);
  }));
}

function renderFeatured(){
  const featured = $('#featuredList');
  if(!featured) return;
  featured.innerHTML = menuItems.map(item => `
    <article class="card" role="listitem">
      <img src="${item.img}" alt="${item.name}" loading="lazy">
      <div class="card-body">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <p><strong>$${item.price}</strong></p>
      </div>
    </article>
  `).join('');
}

function chooseDish(id){
  const found = menuItems.find(m => m.id === id);
  if(!found) return;
  localStorage.setItem('preferredDish', JSON.stringify(found));
  alert(`${found.name} saved as your preferred dish.`);
}

function handleGreet(){
  const name = prompt('Enter your name:');
  alert(`Welcome to Nigerian Resort, ${name && name.trim() ? name.trim() : 'Guest'}!`);
}

function handleFormSubmit(evt){
  evt.preventDefault();
  const form = evt.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const msg = form.message.value.trim();

  if(!name || !email || !msg){
    showFormMessage('Please complete all fields.', true);
    return;
  }
  if(!email.includes('@')) { showFormMessage('Please enter a valid email address.', true); return; }

  const contactObj = { name, email, message: msg, date: new Date().toISOString() };
  localStorage.setItem('lastContact', JSON.stringify(contactObj));
  showFormMessage(`Thanks ${name}! We'll be in touch.`, false);
  form.reset();
}

function showFormMessage(text, isError){
  const el = $('#formMessage');
  if(!el) return;
  el.textContent = text;
  el.style.color = isError ? 'crimson' : 'green';
}

function restoreContactPrefill(){
  const last = localStorage.getItem('lastContact');
  if(!last) return;
  try{
    const data = JSON.parse(last);
    const form = $('#contactForm');
    if(form){
      form.name.value = data.name || '';
      form.email.value = data.email || '';
    }
  }catch(e){}
}

function attachUIHandlers(){
  $('#greetBtn')?.addEventListener('click', handleGreet);
  $('#contactForm')?.addEventListener('submit', handleFormSubmit);

  $all('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.nextElementSibling;
      if(!target) return;
      const isOpen = target.style.display === 'block';
      target.style.display = isOpen ? '' : 'block';
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

function firstTimeVisitGreeting(){
  if(!localStorage.getItem('visited')){
    alert('Welcome to our restaurant website for the first time!');
    localStorage.setItem('visited', 'true');
  }
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
} else { init();
