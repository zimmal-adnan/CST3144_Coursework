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

//retrieves lesson information from the database
app.get('/lessons', async (req, res, next) => {
    try {
        const lessons = db.collection('lessons');
        const search = req.query.search || '';

        let query = {};

        if (search) {
            query = {
                $or: [
                    {subject: {$regex: search, $options: 'i'}},
                    {location: { $regex: search, $options: 'i' }},
                    {$expr: {
                        $regexMatch: {
                            input: {$toString: "$availableSpace"},
                            regex: search,
                            options: 'i'
                        }
                    }}
                ]}
        }

        const results = await lessons.find(query).toArray();
        res.send(results);
    } catch (err) {
        next(err);
    }
});

app.get('/lessons', async (req, res) => {
    const lessons = db.collection('lessons');
    const queryLessons = req.query.search;

    let results;


    if (!queryLessons) {
        results = await lessons.find({}).toArray();
    } 
    else {
        results = await lessons.find({
            $or: [
                {subject: {$regex: queryLessons, $options: 'i'}},
                {location: { $regex: queryLessons, $options: 'i' }},
                {$expr: {
                    $regexMatch: {
                        input: {$toString: "$availableSpace"},
                        regex: queryLessons,
                        options: 'i'
                    }
                }}
            ]}).toArray();
    }

    res.send(results);
})


//inserts order information to the collection
app.post('/orders', async (req, res, next) => {
    try {
        const result = await db.collection('order').insertOne(req.body);
        res.status(201).send({msg: 'success', insertedId: result.insertedId});
    } catch (err) {
        next(err);
    }
});

app.put('/lessons/:id', async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send({ msg: 'Invalid ObjectId' });
        }

        const result = await db.collection('lessons').updateOne (
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        res.send(result.matchedCount === 1 ? { msg: 'success' } : { msg: 'error' });
    } catch (err) {
        next(err);
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