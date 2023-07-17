const express = require('express');
const router = express.Router();

router.get('/',  (req, res) => {

    if (req.session.user) {

      const userData =  req.session.user;
      res.json(userData);

    } else {

      return false;
    }
});

module.exports = router