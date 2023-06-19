# API Documentation

## Overview
This API provides CRUD operations for managing recipes in a MongoDB database. The base URL for all endpoints is:

```
https://dwad-recipe-api.onrender.com
```

## Recipes API

### Get All Recipes

- **URL**: `/recipes`
- **Method**: `GET`
- **Response**: An array of recipe objects.

#### Sample JavaScript Client Code Using `fetch()`
```javascript
fetch('http://localhost:8888/recipes')
  .then(response => response.json())
  .then(recipes => console.log(recipes))
  .catch(error => console.error('Error:', error));
```

#### Sample Response
```json
[
    {
        "_id": "60a3d8a12f4f7c0013bd8a33",
        "title": "Pancake",
        "ingredients": ["flour", "milk", "egg", "sugar"]
    },
    {
        "_id": "60a3d8c62f4f7c0013bd8a34",
        "title": "Scrambled Eggs",
        "ingredients": ["eggs", "milk", "salt", "butter"]
    }
]
```

### Get a Recipe by ID

- **URL**: `/recipes/:recipeId`
- **Method**: `GET`
- **URL Parameters**: `recipeId=[string]` (required)
- **Response**: A single recipe object.

#### Sample JavaScript Client Code Using `fetch()`
```javascript
const recipeId = '60a3d8a12f4f7c0013bd8a33';

fetch(`http://localhost:8888/recipes/${recipeId}`)
  .then(response => response.json())
  .then(recipe => console.log(recipe))
  .catch(error => console.error('Error:', error));
```

#### Sample Response
```json
{
    "_id": "60a3d8a12f4f7c0013bd8a33",
    "title": "Pancake",
    "ingredients": ["flour", "milk", "egg", "sugar"]
}
```

### Create a New Recipe

- **URL**: `/recipes`
- **Method**: `POST`
- **Request Body**: JSON object containing `title` and `ingredients`.
  - `title` (string): The title of the recipe.
  - `ingredients` (array of strings): The ingredients for the recipe.
- **Response**: The result of the insert operation.

#### Sample JavaScript Client Code Using `fetch()`
```javascript
const recipe = {
  title: "French Toast",
  ingredients: ["bread", "eggs", "milk", "cinnamon", "sugar"]
};

fetch('http://localhost:8888/recipes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(recipe)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

#### Sample Response
```json
{
    "acknowledged": true,
    "insertedId": "60a3d9252f4f7c0013bd8a35"
}
```

### Update a Recipe

- **URL**: `/recipes/:id`
- **Method**: `PUT`
- **URL Parameters**: `id=[string]` (required)
- **Request Body**: JSON object containing `title` and `ingredients`.
  - `title` (string): The title of the recipe.
  - `ingredients` (array of strings): The ingredients for the recipe.
- **Response**:

 JSON object containing the status of the operation.

#### Sample JavaScript Client Code Using `fetch()`
```javascript
const recipeId = '60a3d8a12f4f7c0013bd8a33';
const updatedRecipe = {
  title: "French Toast",
  ingredients: ["bread", "eggs", "milk", "cinnamon", "sugar", "vanilla extract"]
};

fetch(`http://localhost:8888/recipes/${recipeId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updatedRecipe)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

#### Sample Response
```json
{
    "status": true
}
```