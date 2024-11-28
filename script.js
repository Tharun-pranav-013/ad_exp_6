const searchBtn = document.getElementById('search-btn');
const recipeContainer = document.getElementById('recipe-container');

// Spoonacular API Info
const API_KEY = '276e81691e1b49839b2481fd704e0372'; // Replace with your actual API key
const API_URL = `https://api.spoonacular.com/recipes/complexSearch`;

// Function to fetch recipes based on search query and display JSON
async function fetchRecipes(query) {
  try {
    const res = await fetch(`${API_URL}?query=${query}&number=9&apiKey=${API_KEY}`);
    const data = await res.json();

    // Display the JSON data in the browser
    recipeContainer.innerHTML = `<pre>${JSON.stringify(data.results, null, 2)}</pre>`;

    // Send the JSON data to the server to save it
    saveRecipesToFile(data.results);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    recipeContainer.innerHTML = '<p>There was an error fetching recipes. Please try again later.</p>';
  }
}

// Function to send JSON data to the server for saving
async function saveRecipesToFile(data) {
  try {
    const res = await fetch('/api/save-recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipes: data })
    });
    const responseMessage = await res.json();
    alert(responseMessage.message); // Show success or error message
  } catch (error) {
    console.error('Error saving recipes to file:', error);
  }
}

// Search button click event
searchBtn.addEventListener('click', async () => {
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    await fetchRecipes(query);
  }
});
