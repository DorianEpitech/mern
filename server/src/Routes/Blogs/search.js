const express = require('express');
const router = express.Router();
const config = require('../../config');
const MongoClient = require('mongodb').MongoClient;

router.post('/search', async (req, res) => {

  try {

        const client = await MongoClient.connect(config.clusterURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(config.db);
        const collection = db.collection('users');

        const keyword = req.body.value
        const regex = new RegExp(keyword, 'i')

        const bills = await collection

        .aggregate([
            {
              $match: {
                $or: [
                  { 'blog.billets.title': { $regex: regex } },
                  { 'blog.billets.content': { $regex: regex } },
                  { 'blog.billets.category': { $regex: new RegExp('\\b' + regex.source + '\\b', 'i') } }
                ]
              }
            },
            {
              $project: {
                _id: 0,
                bills: {
                  $filter: {
                    input: '$blog.billets',
                    as: 'bill',
                    cond: {
                      $or: [
                        { $regexMatch: { input: '$$bill.title', regex } },
                        { $regexMatch: { input: '$$bill.content', regex } },
                        { $regexMatch: { input: '$$bill.category', regex: new RegExp('\\b' + regex.source + '\\b', 'i') } }
                      ]
                    }
                  }
                }
              }
            },
            {
              $unwind: '$bills'
            }
          ])
          .toArray();

        await client.close();
        
        res.json(bills);

    } catch (err) {

        res.status(500).json({ error: err });
    }
});

module.exports = router;