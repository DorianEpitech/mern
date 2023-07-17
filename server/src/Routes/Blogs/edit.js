const config = require('../../config.js')
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(config.clusterURI, { useNewUrlParser: true });

router.put("/bill/:id", async (req, res) => {

    try {

        const client = await MongoClient.connect(config.clusterURI, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db(config.db);
        const collection = db.collection('users');

        const userId = new ObjectId(req.session.user[0]._id);
        const billId = new ObjectId(req.params.id);

        const { content, title, category } = req.body

        await collection.updateOne(
            
            {
                _id: userId,
                'blog.billets.id': billId,
            },
            {
                $set: {
                    
                    'blog.billets.$.title': title,
                    'blog.billets.$.content': content,
                    'blog.billets.$.category': category
                },
            }
        )

        res.status(200).json({message: "Success !"})

    } catch (err) {

        res.status(400).json({message: err})

    } finally {

        await client.close()
    }
})

module.exports = router