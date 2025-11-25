const recipes = [
    { name: 'Jollof Rice', category: 'Lunch', ingredients: ['Rice', 'Tomato', 'Onion', 'Spices'], instructions: 'Cook rice with tomato sauce and spices.' },
    { name: 'Egusi Soup', category: 'Dinner', ingredients: ['Melon Seeds', 'Spinach', 'Meat'], instructions: 'Cook melon seeds with spinach and meat.' },
    { name: 'Pounded Yam', category: 'Lunch', ingredients: ['Yam', 'Water', 'Salt'], instructions: 'Boil yam, then pound to desired texture.' },
    { name: 'Suya', category: 'Dinner', ingredients: ['Beef', 'Spices', 'Oil'], instructions: 'Skewer and grill beef with spice mix.' }
];

document.addEventListener('DOMContentLoaded', () => displayRecipes('All'));

function displayRecipes(category) {
    const container = document.getElementById('recipeList');
    container.innerHTML = '';
    const filtered = category === 'All' ? recipes : recipes.filter(r => r.category.toLowerCase() === category.toLowerCase());

    filtered.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="images/${recipe.name.toLowerCase().replace(/\s+/g,'')}.jpg" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        `;
        container.appendChild(card);
    });
}
