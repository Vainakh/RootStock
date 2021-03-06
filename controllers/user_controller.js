const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
    console.log(req.body);
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
        if(error) {
            console.log(error)
            res.json({
                error: 'User already exists'
            });
        } else {
            req.session.user = createdUser;
            res.json(createdUser);
        }
    });
});

router.get('/', (req, res) => {
  User.find({}, (error, foundUser) => {
    console.log(foundUser);
    res.json(foundUser)
  })
})

router.get('/:username', (req, res) => {
  User.find({username: req.params.username}, (error, foundUser) => {
    console.log(foundUser);
    res.json(foundUser)
  })
})

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
        res.json(deletedUser);
    });
});

module.exports = router;
