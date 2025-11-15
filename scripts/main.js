// main.js

// Recipe data
const recipes = [
    {
        id: 1,
        title: "Pancakes",
        category: "Breakfast",
        image: "images/recipe1.jpg",
        ingredients: ["Flour", "Eggs", "Milk", "Sugar"],
        steps: ["Mix ingredients", "Cook on skillet", "Serve with syrup"]
    },
    {
        id: 2,
        title: "Jollof Rice",
        category: "Lunch",
        image: "images/recipe2.jpg",
        ingredients: ["Rice", "Tomatoes", "Onions", "Spices"],
        steps: ["Cook rice", "Add sauce", "Simmer", "Serve hot"]
    },
    {
        id: 3,
        title: "Smoothie",
        category: "Drinks",
        image: "images/recipe3.jpg",
        ingredients: ["Banana", "Milk", "Honey", "Ice"],
        steps: ["Blend ingredients", "Pour in glass", "Serve chilled"]
    }
];

// DOM Elements
const recipeContainer = document.getElementById("recipeContainer");
const filterSelect = document.getElementById("categoryFilter");

// Favorites from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Render recipes
function renderRecipes(filter = "All") {
    recipeContainer.innerHTML = "";

    let filtered = filter === "All" ? recipes : recipes.filter(r => r.category === filter);

    if (filtered.length === 0) {
        recipeContainer.innerHTML = `<p>No recipes found.</p>`;
        return;
    }

    filtered.forEach(r => {
        const isFav = favorites.includes(r.id) ? "❤️" : "🤍";
        const card = `
            <div class="card">
                <img src="${r.image}" alt="${r.title}" loading="lazy">
                <h3>${r.title}</h3>
                <h4>Ingredients:</h4>
                <ul>${r.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
                <h4>Steps:</h4>
                <ol>${r.steps.map(s => `<li>${s}</li>`).join('')}</ol>
                <button onclick="toggleFavorite(${r.id})">${isFav} Favorite</button>
            </div>
        `;
        recipeContainer.innerHTML += card;
    });
}

// Filter event
if(filterSelect){
    filterSelect.addEventListener("change", e => {
        renderRecipes(e.target.value);
    });
}

// Toggle favorite
function toggleFavorite(id){
    if(favorites.includes(id)){
        favorites = favorites.filter(fav => fav !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderRecipes(filterSelect.value);
}

// LocalStorage Example: count form submissions
function saveSubmission() {
    let count = localStorage.getItem("submitCount") || 0;
    count++;
    localStorage.setItem("submitCount", count);
    alert(`You have submitted ${count} times`);
}

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Initial render
if(recipeContainer) renderRecipes();
