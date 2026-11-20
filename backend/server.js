require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;

const uri = process.env.MONGODB_URI; //connection string from Atlas
const client = new MongoClient(uri);
let db;

//Middleware
app.use(cors());
app.use(express.json());

//Logger Middleware
app.use((req, res, next) =>{
    req.time = new Date(Date.now()).toString();
    console.log(`${chalk.yellow.bgBlack(req.method)}, ${chalk.red.bgBlack(req.hostname)}, ${req.path}, ${chalk.blueBright.bgBlack(req.time)}`);
    next();
});

//Static Images Middleware
app.use(function(req, res, next) {
    var filePath = path.join(__dirname, "static", req.url); //Uses path.join to find the path where the file should be

    fs.stat(filePath, function(err, fileInfo) { //Built-in fs.stat gets info about a file
        if (err) {
            next();
            return;
        }

        if (fileInfo.isFile()) {
            res.sendFile(filePath);
        } else {
            next();
        }
    });
});


app.get('/lessons', async (req, res) => {
    try {
        const results = await db.collection('lessons').find({}).toArray();
        res.json(results);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//Error Handler Middleware
app.use(function(req, res) {
    res.status(404);
    res.send("File not found!");
});


async function startServer() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        db = client.db('webstore');

        app.listen(PORT, () => {
            console.log(chalk.green.bold(`Server is running on http://localhost:${PORT}`));
        });
    } catch (err) {
        console.error('Failed to start server:', err);
    }
}

startServer();