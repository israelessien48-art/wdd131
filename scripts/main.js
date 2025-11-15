// Greet Button
document.getElementById('greetBtn')?.addEventListener('click', () => {
    const name = prompt("Enter your name:");
    alert(`Welcome to Nigerian Resort, ${name || "Guest"}!`);
});

// Menu Items Object & Array
const menuItems = [
    { name: "Jollof Rice", price: 12 },
    { name: "Egusi Soup", price: 15 },
    { name: "Pounded Yam", price: 10 }
];

// Populate Menu Page
const menuList = document.getElementById('menuList');
if(menuList){
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        menuList.appendChild(li);
    });
}

// Form Submission
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', function(e){
    e.preventDefault();
    const name = this.name.value;
    alert(`Thank you, ${name}! Your message has been sent.`);
    localStorage.setItem('lastContact', new Date().toLocaleDateString());
});

// Conditional localStorage
if(!localStorage.getItem('visited')){
    alert("Welcome to our restaurant website for the first time!");
    localStorage.setItem('visited', true);
}
