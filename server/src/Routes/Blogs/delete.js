const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const config = require('../../config');
const MongoClient = require('mongodb').MongoClient;

router.delete('/bill/:id', async (req, res) => {

  try {

        const client = await MongoClient.connect(config.clusterURI, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db(config.db);
        const collection = db.collection('users');

        const userId = req.session.user[0]._id;
        const billId = req.params.id;

        await collection.updateOne(

            { _id: new ObjectId(userId)  },
            { $pull: { 'blog.billets': { id: new ObjectId(billId) } } }
        );

        res.status(200).json({ message: 'Bill deleted with success' });

    } catch (error) {

        res.status(500).json({ error: 'Error during Bill deletion' });
    }
});

module.exports = router;
