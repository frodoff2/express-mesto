const express = require('express');

const router = express.Router();
const path = require('path');
const fs = require('fs');

const readFile = (way) => new Promise((res, rej) => {
  fs.readFile(way, (err, data) => {
    if (err) {
      rej(err);
    }
    res(data);
  });
});

router.get('/users', (req, res) => {
  readFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((data) => res
      .status(200)
      .send(JSON.parse(data)))
    .catch(() => res
      .status(500)
      .send('Error'));
});

router.get('/users/:id', (req, res) => {
  readFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((data) => {
      // eslint-disable-next-line no-underscore-dangle
      const user = JSON.parse(data).find((owner) => owner._id === req.params.id);
      if (user) {
        return res
          .status(200)
          .send(user);
      }
      return res
        .status(404)
        .send({ message: 'нет такого id' });
    })
    .catch(() => res
      .status(500)
      .send('error'));
});

module.exports = router;
