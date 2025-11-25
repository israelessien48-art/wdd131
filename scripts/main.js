// ================== Recipes Data ==================
const recipes = [
    {
        name: 'Jollof Rice',
        category: 'Lunch',
        ingredients: ['Rice', 'Tomato', 'Onion', 'Spices'],
        instructions: 'Cook rice with tomato sauce and spices.'
    },
    {
        name: 'Egusi Soup',
        category: 'Dinner',
        ingredients: ['Melon Seeds', 'Spinach', 'Meat'],
        instructions: 'Cook melon seeds with spinach and meat.'
    },
    {
        name: 'Pounded Yam',
        category: 'Lunch',
        ingredients: ['Yam', 'Water', 'Salt'],
        instructions: 'Boil yam, then pound to desired texture.'
    },
    {
        name: 'Suya',
        category: 'Dinner',
        ingredients: ['Beef', 'Spices', 'Oil'],
        instructions: 'Skewer and grill beef with spice mix.'
    }
];

// ================== Display Recipes ==================
document.addEventListener('DOMContentLoaded', () => {
    displayRecipes('All');

    // Reservation form
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const guests = document.getElementById('guests').value;
            const date = document.getElementById('date').value;
            alert(`Thank you ${name}! Your reservation for ${guests} guest(s) on ${date} is confirmed.`);
            reservationForm.reset();
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Thank you ${name}! Your message has been sent.`);
            contactForm.reset();
        });
    }
});

function displayRecipes(category) {
    const container = document.getElementById('recipeList');
    if (!container) return;

    container.innerHTML = '';

    const filtered = category === 'All' ? recipes : recipes.filter(r => r.category.toLowerCase() === category.toLowerCase());

    filtered.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="images/${recipe.name.toLowerCase().replace(/\s+/g, '')}.jpg" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        `;
        container.appendChild(card);
    });
}

function filterRecipes(category) {
    displayRecipes(category);
}
