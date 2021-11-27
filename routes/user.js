const express = require('express');
//const user = require('../../../ToDoApp/backend/model/user');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const auth = require("../middlewares/auth");

router.post('/login', async (req, resp) => {
    const {
        email,
        password
    } = req.body;
    const _user = new User({
        email:email
    });
    _user.password = password;
    if(_user.authenticate(password)){
        const user = await User.findOne({email:email});
        // Create token
        const token = jwt.sign(
            { email: email },
            process.env.TOKEN_KEY,
            {
            expiresIn: "2h",
            }
        );
        return resp.status(200).json({
            user:user,
            token: token
    });
    }else {
        return resp.status(401).json({
            message: "Invalid Credentials"
    });
    }
    // User.findOne({email: email, })
});

router.post('/signup', (req, resp) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(user) return resp.status(400).json({
           message: 'User already registered'
        });

        const {
            email,
            password
        } = req.body;

        const _user = new User({
            email: email
        });
        _user.password = password;

        _user.save((error, data) => {
            if(error)
                return resp.status(400).json({
                    message: error
            });
            if(data)
                return resp.status(201).json({
                    user: data,
                    token: token,
                    message: "User added successfully"
                })
        })

    })
});


module.exports = router;
