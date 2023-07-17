const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const config = require('../../config');

router.get('/bills/:login', async (req, res) => {

  try {

    const client = await MongoClient.connect(config.clusterURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(config.db);
    const collection = db.collection('users');

    const user = await collection
        .findOne({ login: req.params.login });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user.blog.billets);

  } catch (error) {

    res.status(500).json({ error });
  }
});

module.exports = router;
