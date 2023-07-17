const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const config = require('../../config');
const MongoClient = require('mongodb').MongoClient;

router.post('/bill/:id', async (req, res) => {

  try {

        const client = await MongoClient.connect(config.clusterURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(config.db);
        const collection = db.collection('users');

        const billId = new ObjectId(req.params.id);
        const user = req.body.user;

        const bill = await collection.findOne({

            "blog.billets.id": billId,
            login: user
        });

        await client.close();
    
        res.json(bill);

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: err });
    }
});

module.exports = router;
