const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = express();

// Spoonacular API Key (replace with your actual API key)
const API_KEY = '276e81691e1b49839b2481fd704e0372';

// Middleware to serve static files and parse JSON data
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint to save fetched recipes as JSON in uploads/recipes.json
app.post('/api/save-recipes', (req, res) => {
  const recipes = req.body.recipes;
  const uploadsDir = path.join(__dirname, 'uploads');

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir); // Create uploads folder if it doesn't exist
  }

  const filePath = path.join(uploadsDir, 'recipes.json');
  fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2)); // Save JSON data
  res.status(200).json({ message: 'Recipes saved successfully in uploads/recipes.json' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
