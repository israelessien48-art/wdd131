const recipes = [
    { name: 'Jollof Rice', category: 'Lunch', ingredients: ['Rice', 'Tomato', 'Onion', 'Spices'], instructions: 'Cook rice with tomato sauce and spices.' },
    { name: 'Egusi Soup', category: 'Dinner', ingredients: ['Melon Seeds', 'Spinach', 'Meat'], instructions: 'Cook melon seeds with spinach and meat.' },
    { name: 'Pounded Yam', category: 'Lunch', ingredients: ['Yam', 'Water', 'Salt'], instructions: 'Boil yam, then pound to desired texture.' },
    { name: 'Suya', category: 'Dinner', ingredients: ['Beef', 'Spices', 'Oil'], instructions: 'Skewer and grill beef with spice mix.' }
];

// Display dishes on homepage
document.addEventListener('DOMContentLoaded', () => {
    const dishContainer = document.getElementById('dishCards');
    recipes.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="images/dish${recipes.indexOf(dish)+1}.jpg" alt="${dish.name}">
            <h3>${dish.name}</h3>
            <p><strong>Category:</strong> ${dish.category}</p>
            <p>${dish.instructions}</p>
        `;
        dishContainer.appendChild(card);
    });

    // Reservation form
    const form = document.getElementById('reservationForm');
    if(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const guests = document.getElementById('guests').value;
            const date = document.getElementById('date').value;
            alert(`Thank you ${name}! Your reservation for ${guests} guest(s) on ${date} is confirmed.`);
            form.reset();
        });
    }
});
