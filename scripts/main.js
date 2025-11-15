/* main.js
  - Provides recipe data and all interactive behavior:
    * render recipe cards (template literals)
    * open detail modal (DOM selection/modification)
    * search and filter using array methods
    * save favorites to localStorage
    * contact form handling with validation & localStorage
    * multiple functions and conditional branching
*/

// ---------- Data: recipes array of objects ----------
const RECIPES_KEY = 'simpleRecipeBook.recipes';
const FAVS_KEY = 'simpleRecipeBook.favorites';

// Initial recipe data (objects)
const defaultRecipes = [
  {
    id: 1,
    title: "Fluffy Buttermilk Pancakes",
    type: "breakfast",
    time: "20 min",
    servings: 4,
    img: "assets/images/pancakes.svg",
    ingredients: [
      "1 1/2 cups all-purpose flour",
      "3 1/2 tsp baking powder",
      "1 tsp salt",
      "1 tbsp sugar",
      "1 1/4 cups milk",
      "1 egg",
      "3 tbsp melted butter"
    ],
    steps: [
      "Whisk dry ingredients together in a bowl.",
      "Mix milk, egg, and melted butter separately, then fold into dry mix until combined.",
      "Heat skillet, pour 1/4 cup batter per pancake, cook until bubbles form, flip and finish."
    ]
  },
  {
    id: 2,
    title: "Shakshuka (Simple)",
    type: "brunch",
    time: "25 min",
    servings: 2,
    img: "assets/images/shakshuka.svg",
    ingredients: [
      "2 tbsp olive oil",
      "1 small onion, chopped",
      "1 red pepper, chopped",
      "2 cloves garlic, minced",
      "1 can (14 oz) crushed tomatoes",
      "4 eggs",
      "Salt, pepper, paprika"
    ],
    steps: [
      "Sauté onion and pepper in oil until soft, add garlic and spices.",
      "Add crushed tomatoes and simmer 8-10 minutes.",
      "Make wells, crack eggs into sauce, cover and cook until whites set."
    ]
  },
  {
    id: 3,
    title: "Bright Garden Salad",
    type: "salad",
    time: "10 min",
    servings: 2,
    img: "assets/images/salad.svg",
    ingredients: [
      "Mixed greens",
      "Cherry tomatoes, halved",
      "Cucumber, sliced",
      "Feta cheese, crumbled",
      "Olive oil, lemon juice, salt and pepper"
    ],
    steps: [
      "Toss greens, tomatoes, cucumber and feta in a bowl.",
      "Whisk olive oil and lemon juice, season, pour over salad and toss."
    ]
  }
];

// ---------- Storage helpers ----------
function loadRecipes() {
  const raw = localStorage.getItem(RECIPES_KEY);
  if (!raw) {
    // store default on first load
    localStorage.setItem(RECIPES_KEY, JSON.stringify(defaultRecipes));
    return defaultRecipes.slice();
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultRecipes.slice();
  } catch (e) {
    console.error("Failed to parse recipes from storage", e);
    return defaultRecipes.slice();
  }
}

function saveRecipes(recipes) {
  localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
}

function loadFavorites() {
  const raw = localStorage.getItem(FAVS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveFavorites(favs) {
  localStorage.setItem(FAVS_KEY, JSON.stringify(favs));
}

// ---------- Rendering using template literals ----------
function recipeCardTemplate(r) {
  return `
    <article class="card" data-id="${r.id}">
      <img src="${r.img}" alt="${r.title} image" loading="lazy" width="400" height="240" />
      <h3>${r.title}</h3>
      <p>${r.time} • ${r.servings} servings</p>
      <div class="actions">
        <button class="btn view-btn" data-id="${r.id}">View</button>
        <button class="btn secondary fav-btn" data-id="${r.id}">Save</button>
      </div>
    </article>
  `;
}

function renderRecipeGrid(recipes, containerId = 'recipeGrid') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = recipes.map(r => recipeCardTemplate(r)).join('');
}

// ---------- Detail modal ----------
function openModalWithRecipe(recipe) {
  const modal = document.getElementById('detailModal') || document.createElement('section');
  // ensure modal exists on recipes.html; if not, create temporary modal
  if (!document.getElementById('detailModal')) {
    modal.id = 'detailModal';
    modal.className = 'modal';
    modal.innerHTML = `<div class="modal-content"><button id="closeModal" class="close-btn" aria-label="Close">×</button><div id="modalBody"></div></div>`;
    document.body.appendChild(modal);
    document.getElementById('closeModal').addEventListener('click', closeModal);
  }
  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <h2 id="modalTitle">${recipe.title}</h2>
    <p><strong>${recipe.time} • ${recipe.servings} servings</strong></p>
    <h3>Ingredients</h3>
    <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
    <h3>Steps</h3>
    <ol>${recipe.steps.map(s => `<li>${s}</li>`).join('')}</ol>
  `;
  modal.classList.remove('hidden');
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

function closeModal() {
  const modal = document.getElementById('detailModal');
  if (modal) modal.classList.add('hidden');
}

// ---------- Event handlers (delegation) ----------
function setupRecipeEvents() {
  // Clicks for view & save (in both index and recipes pages)
  document.addEventListener('click', (ev) => {
    const viewBtn = ev.target.closest('.view-btn');
    const saveBtn = ev.target.closest('.fav-btn');

    if (viewBtn) {
      const id = Number(viewBtn.dataset.id);
      const recipes = loadRecipes();
      const recipe = recipes.find(r => r.id === id);
      if (recipe) openModalWithRecipe(recipe); // DOM selection + modification
      return;
    }

    if (saveBtn) {
      const id = Number(saveBtn.dataset.id);
      handleSaveFavorite(id);
      return;
    }
  });

  // Close modal button (if present)
  const close = document.getElementById('closeModal');
  if (close) close.addEventListener('click', closeModal);
}

// Save favorite logic (conditional branching & localStorage)
function handleSaveFavorite(recipeId) {
  const favs = loadFavorites();
  const already = favs.find(f => f.id === recipeId);
  if (already) {
    alert(`"${already.title}" is already saved to favorites.`);
    return;
  }
  const recipes = loadRecipes();
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) {
    alert('Recipe not found.');
    return;
  }
  favs.push({ id: recipe.id, title: recipe.title });
  saveFavorites(favs);
  alert(`Saved "${recipe.title}" to favorites.`);
}

// ---------- Search & filter ----------
function setupSearchAndFilter() {
  const search = document.getElementById('searchInput');
  const filter = document.getElementById('filterSelect');
  if (!search && !filter) return;

  function applyFilters() {
    const recipes = loadRecipes();
    const query = search ? search.value.trim().toLowerCase() : '';
    const type = filter ? filter.value : 'all';

    // array methods: filter & map
    const filtered = recipes.filter(r => {
      const matchesQuery = query === '' || r.title.toLowerCase().includes(query) || r.ingredients.join(' ').toLowerCase().includes(query);
      const matchesType = type === 'all' || r.type === type;
      return matchesQuery && matchesType;
    });

    renderRecipeGrid(filtered, 'allRecipes');
  }

  if (search) search.addEventListener('input', applyFilters);
  if (filter) filter.addEventListener('change', applyFilters);

  // initial render for recipes.html
  applyFilters();
}

// ---------- Contact form handling ----------
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('emailAddr').value.trim();
    const message = document.getElementById('message').value.trim();

    // conditional branching and user feedback via template literals
    if (name.length < 2) {
      document.getElementById('formFeedback').textContent = `Please enter a name with at least 2 characters.`;
      return;
    }
    if (!email.includes('@')) {
      document.getElementById('formFeedback').textContent = `Please enter a valid email address.`;
      return;
    }

    // Save contact to localStorage (example of localStorage usage for form)
    const contact = { name, email, message, date: new Date().toISOString() };
    localStorage.setItem('simpleRecipeBook.contact', JSON.stringify(contact));
    document.getElementById('formFeedback').textContent = `Thanks, ${name}! Your message was received.`;
    form.reset();
  });
}

// ---------- Page initializers ----------
function initIndex() {
  // For index.html: render featured (first 3) recipes
  const recipes = loadRecipes();
  renderRecipeGrid(recipes.slice(0, 3), 'recipeGrid');
  setupRecipeEvents();
}

function initRecipesPage() {
  const recipes = loadRecipes();
  renderRecipeGrid(recipes, 'allRecipes');
  setupRecipeEvents();
  setupSearchAndFilter();
  // modal close button is set if modal exists in markup
}

function initContactPage() {
  setupContactForm();
}

// Auto-detect which page and init appropriately
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  if (path.endsWith('index.html') || path.endsWith('/') ) {
    initIndex();
  } else if (path.endsWith('recipes.html')) {
    initRecipesPage();
  } else if (path.endsWith('contact.html')) {
    initContactPage();
  } else {
    // Fallback: render index features when unknown
    initIndex();
  }
});
