const config = require('../../config.js')
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

router.post('/', async (req, res) => {

    const client = await MongoClient.connect(config.clusterURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(config.db);
    const collection = db.collection('users');

    const user = req.body.author;
    const data = {

        id: new ObjectId(),
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        comments: []
    }
    
    await collection.updateOne(

        { login: user },
        { $push: { "blog.billets": data } }
        )
        .then(() => {
            res.status(201).json({ message: "Success" });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
});

module.exports = router  