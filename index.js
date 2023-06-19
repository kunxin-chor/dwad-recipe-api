// SETUP EXPRESS
const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = mongodb.MongoClient;
const dotenv = require('dotenv');
dotenv.config();

let app = express();
app.use(express.json());
app.use(cors());

// connect to the Mongo DB
async function connect() {
    const mongo_url = process.env.MONGO_URI;
    let client = await MongoClient.connect(mongo_url, {
        "useUnifiedTopology": true
    })
    let db = client.db("fake_recipes");
    console.log("database connected");
    return db;
}

// ROUTES

async function main() {
    let db = await connect();

    app.get('/recipes', async (req, res) => {
        let recipes = await db.collection('recipes').find().toArray();
        res.json(recipes)
    })

    app.get('/recipes/:recipeId', async (req, res) => {
        let r = await db.collection('recipes').findOne({
            _id: new ObjectId(req.params.recipeId)
        });
        res.json(r);
    })

    app.post('/recipes', async (req, res) => {
        const { title, ingredients } = req.body;

        // Validation: ingredients must be an array of strings
        if (!Array.isArray(ingredients) || !ingredients.every(ingredient => typeof ingredient === 'string')) {
            return res.status(400).json({ error: 'Ingredients must be an array of strings' });
        }

        let results = await db.collection('recipes').insertOne({ title, ingredients });
        res.json(results);
    });

    app.put('/recipes/:id', async (req, res) => {
        const { title, ingredients } = req.body;
        // Validation: ingredients must be an array of strings
        if (!Array.isArray(ingredients) || !ingredients.every(ingredient => typeof ingredient === 'string')) {
            return res.status(400).json({ error: 'Ingredients must be an array of strings' });
        }

        let results = await db.collection('recipes').updateOne({
            '_id': new ObjectId(req.params.id),
        }, {
            '$set': {
                'title': title,
                'ingredients': ingredients
            }
        })
        res.json({
            'status': true
        })
    })
}


main();

// START SERVER
// note: we set port to 8888 so it won't clash with React
app.listen(process.env.PORT || 8888, () => {
    console.log("server has started")
})