const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const config = require('../../config');
const { ObjectId } = require('mongodb');

router.post('/bills/:billId/comments', async (req, res) => {

  try {

      const { billId } = req.params;
      const { comment, author } = req.body;

      const client = await MongoClient.connect(config.clusterURI, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db(config.db);
      const collection = db.collection('users');

      const updatedBill = await collection.findOneAndUpdate(

          { 'blog.billets.id': new ObjectId(billId)  },
          { $push: { 'blog.billets.$.comments': { comment, author, id: new ObjectId() } } },
          { returnOriginal: false }
      );

      if (!updatedBill) {

          res.status(404).json({ message: 'Bill not found' });
          return;
      }

      res.status(200).json({message: "Comment successfully added !"});

    } catch (error) {

      res.status(500).json({ error });
    }
});

router.delete('/comment/:id', async (req, res) => {

  try {

    const client = await MongoClient.connect(config.clusterURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(config.db);
    const collection = db.collection('users');

    const commentId = new ObjectId(req.params.id)

    await collection.updateOne(
      { 'blog.billets.comments.id': commentId },
      { $pull: { 'blog.billets.$[].comments': { id: commentId } } }
    );

    const user = req.session.user[0];
    user.blog.billets.forEach((bill) => {
      bill.comments = bill.comments.filter((comment) => comment.id.toString() !== commentId.toString());
    });

    await client.close()

    res.status(200).json({message: "success !"})

  } catch (err) {

    res.status(400).json({message: err})
  }
})

module.exports = router;
