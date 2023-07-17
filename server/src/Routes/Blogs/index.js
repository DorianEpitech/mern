const express = require('express');
const router = express.Router();
const config = require('../../config');
const MongoClient = require('mongodb').MongoClient;

router.get('/bills', async (req, res) => {

    try {

        const client = await MongoClient.connect(config.clusterURI, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db(config.db);
        const collection = db.collection('users');

        const users = await collection
        .find({}, {login: 1})
        .toArray()

        const logins = users.map(user => user.login);
        await client.close()

        res.status(200).json(logins)

    } catch (err) {
        
        res.status(400).json({message: err})
    }
})

module.exports = router