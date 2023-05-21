
async function loadPage(pageUrl) {
  const mainContent = document.getElementById("main-content");
  const page = await fetch(pageUrl);
  const pageHTMLContent = await page.text();
  mainContent.innerHTML = pageHTMLContent;
}

const url = "https://gist.githubusercontent.com/abdalabaaji/8ac1f0ff9c9e919c72c5f297a9b5266e/raw/a67887ba7445a6887be4c748fcfa0931f0dd165c/recipes";
let names = [];
let instructions = [];
let ingredients = [];
let image = [];
function createRecipeCard(titleText, imgSrc, instructionsText, index) {
  const recipeCard = document.createElement("div");
  recipeCard.className = "recipe-card";

  const cardImg = document.createElement("img");
  cardImg.src = imgSrc;
  cardImg.className = "card-img";
  recipeCard.appendChild(cardImg);

  const description = document.createElement("div");
  description.className = "description";
  recipeCard.appendChild(description);

  const title = document.createElement("h1");
  title.textContent = titleText;
  description.appendChild(title);

  const hr = document.createElement("hr");
  description.appendChild(hr);

  const subtitle = document.createElement("h2");
  subtitle.textContent = "Instructions";
  description.appendChild(subtitle);

  const instructions = document.createElement("p");
  instructions.className = "instructions";
  instructions.textContent = instructionsText;
  description.appendChild(instructions);

  const actionBtns = document.createElement("div");
  actionBtns.className = "action-btns";
  recipeCard.appendChild(actionBtns);

  const updateBtn = document.createElement("button");
  updateBtn.className = "btn-update";
  updateBtn.innerHTML = '<i class="fa fa-pencil">Update</i>';
  actionBtns.appendChild(updateBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-delete";
  deleteBtn.innerHTML = '<i class="fa fa-trash"> Delete </i>';
  actionBtns.appendChild(deleteBtn);

  // Add event listener for the delete button
  deleteBtn.addEventListener('click', () => {
    console.log(`Delete button clicked for ${titleText}`);

    // Remove the elements at the specified index from each array
    names.splice(index, 1);
    instructions.splice(index, 1);
    ingredients.splice(index, 1);
    image.splice(index, 1);

    // Remove the recipe card from the DOM
    recipeCard.remove();
    render();
  });

  return recipeCard;
}

const recipesContainer = document.getElementById("recipes");


const recipes = [];

async function fetchData() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/abdalabaaji/8ac1f0ff9c9e919c72c5f297a9b5266e/raw/a67887ba7445a6887be4c748fcfa0931f0dd165c/recipes');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


function addRecipes(data) {
  data.forEach(item => {
    recipes.push(item);
    names.push(item.name);
    instructions.push(item.instructions);
    ingredients.push(item.ingredients);
    image.push(item.image); 
  });
}




async function render() {
  const data = await fetchData();
  addRecipes(data);
  for (let i = 0; i < names.length; i++) {
    const recipeCard = createRecipeCard(names[i], image[i], instructions[i], i);
    recipesContainer.appendChild(recipeCard);
  }
}

render();


/* you can use the below code for displaying the card
    the same code is also given in the html file
*/
/*
<div class="recipe-card">
  <img
    src="https://www.themealdb.com/images/media/meals/wyrqqq1468233628.jpg"
    class="card-img"
  />
  <div class="description">
    <h1>Pasta Dish</h1>
    <hr />
    <h2>Instructions</h2>
    <p class="instructions">
      Grease a 1 litre/2 pint pie dish with butter.\r\nCut the crusts off the
      bread.
    </p>
  </div>
  <div class="action-btns">
    <button class="btn-update"><i class="fa fa-pencil">Update</i></button>
    <button class="btn-delete"><i class="fa fa-trash"> Delete </i></button>
  </div>
</div>
*/
