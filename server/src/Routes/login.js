const config = require('../config.js')
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(config.clusterURI, { useNewUrlParser: true });

// LOGIN

router.post('/', async (req, res) => {

    try {

        const data = {

            login: req.body.login,
            password: crypto.createHash('sha1').update(JSON.stringify(req.body.password)).digest('hex'),
        }

        const user = await connect(data.login, data.password)
        if (user.length == 0) throw new Error('Incorrect login or password')

        req.session.user = user;
        res.status(200).send("You are now logged in !");

    } catch(err) {

        res.status(401).send(err.message)

    } finally {

        await client.close()
    }
})

async function connect(login, password) {

    try {
  
        const client = await MongoClient.connect(config.clusterURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(config.db);
        const collection = db.collection('users');
        
        const student = await collection
            .find({ 
                login: login,
                password: password
            })
            .toArray();
    
        return student

    } catch (err) {

        res.status(400).send(err)

    } finally {

        await client.close();
    }
}

module.exports = router