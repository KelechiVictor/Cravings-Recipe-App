const searchForm = document.querySelector('form');
const searchResult = document.querySelector('.search_result');
const container = document.querySelector('.container');
const searchBtn = document.querySelector('.search_btn');
const app_ID = '313ba492';
const app_KEY = '503d687de77307b267b5a2c9e58cf91d';
let searchQuery = '';

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  searchQuery = e.target.querySelector('input').value;
  fetchAPI();
});

/*searchBtn.addEventListener('click', (e) => {
  e.preventDefault();

  searchQuery = e.target.querySelector('input')
  fetchAPI();
});*/

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${app_ID}&app_key=${app_KEY}&from=0&to=50`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  container.classList.remove('initial');
  let generatedHTML = '';
  results.map((result) => {
    generatedHTML +=
      `
    <div class="item">
          <img src="${result.recipe.image}" alt="">
          <div class="flex_container">
            <h1 class="title">${result.recipe.label}</h1>
            <a href="${result.recipe.url}" target="_blank" class="view_btn">View Full Recipe</a>
          </div>
          <p class="item_data">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p class="item_data">Diet: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data'}</p>
          <p class="item_data">Meal Type: ${result.recipe.mealType}</p>
          <p class="item_data">Cuisine: ${result.recipe.cuisineType}</p>
          <p class="item_data">Caution: ${result.recipe.cautions.length > 0 ? result.recipe.cautions : 'No Data'}</p>
          <p class="item_data">Health Label: ${result.recipe.healthLabels}</p>
    </div>
    `;
  })
  searchResult.innerHTML = generatedHTML;
}