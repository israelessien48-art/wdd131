// ================== Recipes Data ==================
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
        image: 'images/dish4.jpg'
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

            showMessage(`Thank you ${name}! Your reservation for ${guests} guest(s) on ${date} is confirmed.`, 'success');
            reservationForm.reset();
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            showMessage(`Thank you ${name}! Your message has been sent.`, 'success');
            contactForm.reset();
        });
    }
});

// ================== Display Recipes Function ==================
function displayRecipes(category) {
    const container = document.getElementById('recipeList');
    if (!container) return;
    container.innerHTML = '';

    const filtered = category === 'All' ? recipes : recipes.filter(r => r.category.toLowerCase() === category.toLowerCase());

    filtered.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <button onclick="addFavorite('${recipe.name}')">Add to Favorites</button>
        `;
        container.appendChild(card);
    });
}

// ================== Filter Recipes ==================
function filterRecipes(category) {
    displayRecipes(category);
}

// ================== Add Favorites ==================
function addFavorite(recipeName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(recipeName)) {
        favorites.push(recipeName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showMessage(`${recipeName} added to favorites!`, 'success');
    } else {
        showMessage(`${recipeName} is already in favorites.`, 'warning');
    }
}

// ================== Styled Message Function ==================
function showMessage(message, type) {
    const div = document.createElement('div');
    div.textContent = message;
    div.style.padding = '1rem';
    div.style.textAlign = 'center';
    div.style.borderRadius = '8px';
    div.style.margin = '1rem auto';
    div.style.maxWidth = '400px';
    div.style.color = '#fff';
    div.style.fontWeight = 'bold';
    div.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';

    if(type === 'success') div.style.backgroundColor = '#06D6A0';
    else if(type === 'warning') div.style.backgroundColor = '#FF6B35';
    else div.style.backgroundColor = '#333';

    document.body.insertBefore(div, document.body.firstChild);

    setTimeout(() => div.remove(), 4000);
}
