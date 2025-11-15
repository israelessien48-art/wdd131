/* main.js
   - single JS file for index, recipes and contact pages
   - features:
     * recipe data (objects + array)
     * render featured and grid (template literals)
     * modal view
     * filter + search (array methods)
     * favorites (localStorage)
     * contact/submit form saves to localStorage
     * visitor name saved to localStorage
*/

// ---------- Data (objects + arrays) ----------
const RECIPES = [
  {
    id: 101,
    title: "Fluffy Buttermilk Pancakes",
    category: "Breakfast",
    time: "20 min",
    servings: 4,
    img: "images/pancakes.svg",
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
      "Whisk dry ingredients together.",
      "Whisk milk, egg, and butter; fold into dry mix.",
      "Cook 1/4 cup per pancake on a hot skillet until bubbles form; flip and finish."
    ]
  },
  {
    id: 102,
    title: "Jollof Rice (Simple)",
    category: "Lunch",
    time: "45 min",
    servings: 4,
    img: "images/jollof.svg",
    ingredients: [
      "2 cups parboiled rice",
      "1 can crushed tomatoes",
      "1 onion, chopped",
      "2 tbsp tomato paste",
      "Spices, vegetable oil, stock"
    ],
    steps: [
      "Sauté onions and tomato paste; add crushed tomatoes and simmer.",
      "Add rice and stock; cook until rice is tender.",
      "Fluff rice and serve with protein or plantain."
    ]
  },
  {
    id: 103,
    title: "Green Smoothie",
    category: "Drinks",
    time: "5 min",
    servings: 1,
    img: "images/smoothie.svg",
    ingredients: [
      "1 banana",
      "1 cup spinach",
      "1/2 cup milk or yogurt",
      "1 tsp honey",
      "Ice"
    ],
    steps: [
      "Combine ingredients in blender.",
      "Blend until smooth.",
      "Serve immediately."
    ]
  }
];

// ---------- Storage helpers ----------
const STORAGE_KEYS = {
  favorites: 'tastebite.favorites',
  visitor: 'tastebite.visitor',
  submissions: 'tastebite.submissions'
};

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.favorites);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
function saveFavorites(list) {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(list));
}

function saveVisitor(name) {
  localStorage.setItem(STORAGE_KEYS.visitor, name);
}
function loadVisitor() {
  return localStorage.getItem(STORAGE_KEYS.visitor) || '';
}

function saveSubmission(sub) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.submissions);
    const arr = raw ? JSON.parse(raw) : [];
    arr.push(sub);
    localStorage.setItem(STORAGE_KEYS.submissions, JSON.stringify(arr));
  } catch (e) {
    console.error(e);
  }
}

// ---------- Rendering (template literals used for HTML output) ----------
function recipeCardHTML(r, favs = []) {
  const isFav = favs.includes(r.id);
  return `
    <article class="card" data-id="${r.id}">
      <img src="${r.img}" alt="${r.title}" loading="lazy" />
      <h3>${r.title}</h3>
      <p class="muted">${r.time} • ${r.servings} servings</p>
      <div class="card-body">
        <button class="btn view-btn" data-id="${r.id}">View</button>
        <button class="btn ghost fav-btn" data-id="${r.id}" aria-pressed="${isFav}">${isFav ? '❤️ Favorite' : '🤍 Favorite'}</button>
      </div>
    </article>
  `;
}

function renderFeatured() {
  const featured = RECIPES[0]; // simple choice: first entry
  const favs = loadFavorites();
  const container = document.getElementById('featuredCard');
  if (!container) return;
  container.innerHTML = `
    <div class="featured-card-inner">
      <div class="featured-img"><img src="${featured.img}" alt="${featured.title}" loading="lazy" /></div>
      <div class="featured-copy">
        <h3>${featured.title}</h3>
        <p class="muted">${featured.time} • ${featured.servings} servings</p>
        <p>${featured.ingredients.slice(0,3).join(', ')}…</p>
        <div style="margin-top:.75rem">
          <button class="btn view-btn" data-id="${featured.id}">View Recipe</button>
          <button class="btn ghost fav-btn" data-id="${featured.id}" aria-pressed="${favs.includes(featured.id)}">${favs.includes(featured.id) ? '❤️ Favorite' : '🤍 Favorite'}</button>
        </div>
      </div>
    </div>
  `;
}

function renderGrid(filter = 'all', gridId = 'recipeGrid') {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const favs = loadFavorites();
  const list = RECIPES.filter(r => filter === 'all' ? true : r.category === filter);
  if (list.length === 0) {
    grid.innerHTML = `<p>No recipes found.</p>`;
    return;
  }
  grid.innerHTML = list.map(r => recipeCardHTML(r, favs)).join('');
}

// ---------- Modal to show details ----------
function openModalWithRecipe(recipeId) {
  const recipe = RECIPES.find(r => r.id === Number(recipeId));
  if (!recipe) return;
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <h2 id="modal-title">${recipe.title}</h2>
    <p class="muted">${recipe.time} • ${recipe.servings} servings</p>
    <h3>Ingredients</h3>
    <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
    <h3>Steps</h3>
    <ol>${recipe.steps.map(s => `<li>${s}</li>`).join('')}</ol>
  `;
  modal.classList.remove('hidden');
  document.getElementById('closeModal').focus();
}
function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.add('hidden');
}

// ---------- Event setup ----------
function setupEvents() {
  // Delegated click for view and favorite buttons
  document.addEventListener('click', (e) => {
    const viewBtn = e.target.closest('.view-btn');
    const favBtn = e.target.closest('.fav-btn');

    if (viewBtn) {
      const id = viewBtn.dataset.id;
      openModalWithRecipe(id);
      return;
    }

    if (favBtn) {
      const id = Number(favBtn.dataset.id);
      toggleFavorite(id);
      return;
    }
  });

  // Close modal
  const closeBtn = document.getElementById('closeModal');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Modal close on Escape
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // Filter on index
  const filterSelect = document.getElementById('filter');
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => renderGrid(e.target.value));
  }

  // Search/filter in recipes page (if present)
  const search = document.getElementById('search');
  const filter2 = document.getElementById('filter2');
  if (search || filter2) {
    const apply = () => {
      const q = search ? search.value.trim().toLowerCase() : '';
      const category = filter2 ? filter2.value : 'all';
      // filter using array methods
      const results = RECIPES.filter(r => {
        const matchesCategory = category === 'all' ? true : r.category === category;
        const matchesQuery = q === '' ? true : (r.title.toLowerCase().includes(q) || r.ingredients.join(' ').toLowerCase().includes(q));
        return matchesCategory && matchesQuery;
      });
      const grid = document.getElementById('recipeGridPage');
      if (grid) grid.innerHTML = results.map(r => recipeCardHTML(r, loadFavorites())).join('') || '<p>No recipes found.</p>';
    };
    if (search) search.addEventListener('input', apply);
    if (filter2) filter2.addEventListener('change', apply);
    apply(); // initial
  }

  // View favorites button on index
  const favViewBtn = document.getElementById('favViewBtn');
  if (favViewBtn) favViewBtn.addEventListener('click', () => {
    const favs = loadFavorites();
    if (favs.length === 0) {
      alert('No favorites saved yet.');
      return;
    }
    const list = RECIPES.filter(r => favs.includes(r.id));
    const modal = document.getElementById('modal');
    const content = document.getElementById('modalContent');
    content.innerHTML = `<h2 id="modal-title">Your Favorites</h2>${list.map(r => `<div><h3>${r.title}</h3><p class="muted">${r.time}</p></div>`).join('')}`;
    modal.classList.remove('hidden');
  });

  // Visitor name form
  const nameForm = document.getElementById('nameForm');
  if (nameForm) {
    nameForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nm = document.getElementById('visitorName').value.trim();
      if (nm.length < 2) {
        alert('Please enter at least 2 characters.');
        return;
      }
      saveVisitor(nm);
      showWelcome();
      nameForm.reset();
    });
  }

  // Contact/recipe submission form
  const recipeForm = document.getElementById('recipeForm');
  if (recipeForm) {
    recipeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('author').value.trim();
      const recipeName = document.getElementById('recipeName').value.trim();
      const category = document.getElementById('category').value;
      const ingredients = document.getElementById('ingredients').value.trim();
      const steps = document.getElementById('steps').value.trim();

      if (!author || !recipeName || !category || !ingredients || !steps) {
        document.getElementById('formMessage').textContent = 'Please complete all fields.';
        return;
      }

      const newRecipe = {
        id: Date.now(),
        title: recipeName,
        category,
        time: 'Varies',
        servings: 2,
        img: 'images/pancakes.svg',
        ingredients: ingredients.split(',').map(s => s.trim()),
        steps: steps.split(';').map(s => s.trim())
      };

      // save submission to localStorage for instructor review
      saveSubmission({author, submitted: newRecipe, date: new Date().toISOString()});
      document.getElementById('formMessage').textContent = `Thanks ${author}! Your recipe is saved locally.`;
      recipeForm.reset();
    });
  }
}

// ---------- Favorites toggle ----------
function toggleFavorite(id) {
  const favs = loadFavorites();
  if (favs.includes(id)) {
    const updated = favs.filter(x => x !== id);
    saveFavorites(updated);
  } else {
    favs.push(id);
    saveFavorites(favs);
  }
  // re-render visible grids
  renderFeatured();
  renderGrid('all', 'recipeGrid');
  const gridPage = document.getElementById('recipeGridPage');
  if (gridPage) renderGrid('all', 'recipeGridPage');
}

// ---------- UI helpers ----------
function showWelcome() {
  const name = loadVisitor();
  const el = document.getElementById('welcomeBack');
  if (!el) return;
  if (name) el.textContent = `Welcome back, ${name}!`;
  else el.textContent = '';
}

// render grid with possible gridId
function renderGrid(filter = 'all', gridId = 'recipeGrid') {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  const favs = loadFavorites();
  const list = RECIPES.filter(r => filter === 'all' ? true : r.category === filter);
  grid.innerHTML = list.map(r => recipeCardHTML(r, favs)).join('');
}

// ---------- Init depending on page ----------
function init() {
  setupEvents();
  showWelcome();
  renderFeatured();
  renderGrid('all', 'recipeGrid');
  // if recipe page grid exists, render there too
  const gridPage = document.getElementById('recipeGridPage');
  if (gridPage) renderGrid('all', 'recipeGridPage');
  // if there is a filter select on recipes.html
  const filter2 = document.getElementById('filter2');
  if (filter2) filter2.addEventListener('change', () => renderGrid(filter2.value, 'recipeGridPage'));
}

// kick off after DOM loaded
document.addEventListener('DOMContentLoaded', init);
