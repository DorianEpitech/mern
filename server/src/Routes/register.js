const config = require('../config.js')
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(config.clusterURI, { useNewUrlParser: true });

// REGISTER

router.post('/', async (req, res) => {

    try {

        await client.connect();
        const db = client.db(config.db)
        const collection = db.collection('users')

        const data = {

            login: req.body.login,
            email: req.body.email,
            password: crypto.createHash('sha1').update(JSON.stringify(req.body.password)).digest('hex'),
            type: false,
            blog: {
                billets: []
            }

        }

        if (req.body.password !== req.body.confirmPassword) {

            throw new Error("Passwords doesn't match")

        } else if (await getUsersEmails(req.body.email) > 0) {

            throw new Error("This email already exists")

        } else if (await getUsersLogin(req.body.login) > 0) {

            throw new Error("This login already exists")
        }

        await collection.insertOne(data)

        res.status(200).send('Registered Successfully')

    } catch(err) {

        res.status(400).send(err.message)

    } finally {

        await client.close()
    }
})

// FUNCTIONS

async function getUsersEmails(email) {

    try {
  
        const client = await MongoClient.connect(config.clusterURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(config.db);
        const collection = db.collection('users');
        
        const student = await collection
            .find({ email: email })
            .toArray();
        
        await client.close();
        return student.length

    } catch (error) {

    }
}

async function getUsersLogin(login) {

    try {
  
        const client = await MongoClient.connect(config.clusterURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(config.db);
        const collection = db.collection('users');
        
        const student = await collection
            .find({ login: login })
            .toArray();
    
        await client.close();
        return student.length

    } catch (error) {

    }
}

module.exports = router