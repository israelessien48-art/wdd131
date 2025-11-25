// Nigerian Menu Data
const recipes = [
    {
        name: 'Jollof Rice',
        category: 'Lunch',
        ingredients: ['Rice', 'Tomato', 'Onion', 'Spices'],
        instructions: 'Cook rice with tomato stew and spices.'
    },
    {
        name: 'Egusi Soup',
        category: 'Dinner',
        ingredients: ['Melon Seeds', 'Spinach', 'Meat'],
        instructions: 'Cook melon seeds with spinach and assorted meat.'
    },
    {
        name: 'Akara',
        category: 'Breakfast',
        ingredients: ['Beans', 'Onion', 'Salt', 'Oil'],
        instructions: 'Blend beans with onion and fry until golden.'
    },
    {
        name: 'Suya',
        category: 'Dinner',
        ingredients: ['Beef', 'Spices', 'Oil'],
        instructions: 'Season beef with suya spice and grill.'
    }
];

// Load recipes
document.addEventListener('DOMContentLoaded', () => displayRecipes('All'));

function displayRecipes(category) {
    const container = document.getElementById('recipeList');
    container.innerHTML = '';

    const filtered =
        category === 'All'
            ? recipes
            : recipes.filter(r => r.category === category);

    filtered.forEach(recipe => {
        container.innerHTML += `
        <div class="card">
            <h3>${recipe.name}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <button onclick="addFavorite('${recipe.name}')">Add to Favorites</button>
        </div>`;
    });
}

function filterRecipes(category) {
    displayRecipes(category);
}

function addFavorite(recipeName) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.includes(recipeName)) {
        favorites.push(recipeName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${recipeName} added to favorites!`);
    } else {
        alert(`${recipeName} is already in favorites.`);
    }
}
