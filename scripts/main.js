// First visit alert
if (!localStorage.getItem('visited')) {
  alert('Welcome to our restaurant website for the first time!');
  localStorage.setItem('visited', 'true');
}

// Greet Me button
const greetBtn = document.getElementById('greetBtn');
if (greetBtn) {
  greetBtn.addEventListener('click', () => {
    const name = prompt('Enter your name:');
    if (name && name.trim().length > 0) {
      alert(`Welcome to Nigerian Resort, ${name.trim()}!`);
    } else {
      alert('Welcome to Nigerian Resort, Guest!');
    }
  });
}

// Menu items for menu.html
const menuItems = [
  { name: "Jollof Rice", price: 12 },
  { name: "Egusi Soup", price: 15 },
  { name: "Pounded Yam", price: 10 }
];

const menuList = document.getElementById('menuList');
if (menuList) {
  menuItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    menuList.appendChild(li);
  });
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const name = this.name.value;
    alert(`Thank you, ${name}! Your message has been sent.`);
    localStorage.setItem('lastContact', new Date().toLocaleDateString());
    this.reset();
  });
}
