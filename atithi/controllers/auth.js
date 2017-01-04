var express = require('express');
var app = express();
var apiRoutes = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../app/models/user');
require('../app/models/user');
var isEmpty = require('validate.io-empty');
var validator = require("email-validator");
var bcrypt = require('bcrypt');
var error=require('../helper/error_constants');

app.set('superSecret', config.secret);

exports.register = function (req, res) {
    console.log(req.body);

    if (req.body.name && req.body.email && req.body.password) {
        var email = validator.validate(req.body.email.trim());
        console.log(email);

        if (isNaN(req.body.name)) {
            if (email) {
                if (req.body.password.length >= 6) {

                    // create a sample user
                    var user = new User();

                    user.name = req.body.name;
                    user.email = req.body.email.trim();
                    user.password = req.body.password;

                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(user.password, salt, function (err, hash) {
                            if (err) {
                                res.status(500).send({'error': true, 'massage': error.INTERNAL_SERVER_ERROR});
                            }
                            else if (!hash) {
                                res.status(400).send({'error': true, 'massage': error.Password_Encryption_Error});
                            }
                            else {
                                user.password = hash;
                                user.save(function (err) {
                                    if (err) {
                                        //console.log(err);
                                        res.status(400).send({'error': true, 'message': error.User_Not_Found});
                                    }
                                    else {
                                        var token = jwt.sign(user, app.get('superSecret'), {
                                            expiresIn: 86400 // expires in 24 hours

                                        });

                                        console.log('User saved successfully');
                                        res.json({success: true, token: token});
                                        user.token = token;
                                        user.save();
                                    }//else loop token end
                                });//save method
                            }
                        });
                    });
                 }
                else {
                    res.status(400).send({'error': true, 'meassage': error.Short_Password_Error});
                }
            }
            else {
                res.status(400).send({'error': true, 'meassage': error.Incorrect_Email_Error});
            }
        }
        else {
            res.status(400).send({'error': true, 'meassage': error.Incorrect_Name_Error});
        }
    }
    else {
        res.status(400).send({'error': true, 'meassage': error.Incorrect_Input_data_Error});
    }
};


exports.login = function (req, res) {
    var password = req.body.password;


    User.findOne({email: req.body.email.trim()}, function (err, user) {
        console.log("successfully find user ");

        if (err) {
            console.log(err);
        }
        if (!user) {
            res.json({success: false, message: error.User_Not_Found});
        }
        else {
            var hash1 = user.password;
            bcrypt.compare(password, hash1, function (err, isMatch) {

                    if (err) {
                        res.status(500).send({'error': true, 'massage': error.INTERNAL_SERVER_ERROR});
                    }
                    if (isMatch) {
                        console.log(isMatch);

                        if (password != req.body.password) {
                            res.send({'error': true, 'massage': error.Password_Encryption_Error});
                        }
                        else {
                             user.token=null;
                             user.save();

                            var token = jwt.sign(user, app.get('superSecret'), {
                                expiresIn: 86400 // expires in 24 hours

                            });
                            res.json({
                                success: true,
                                message: 'Your login token generate!',
                                token: token
                            });
                            user.token=token;
                            user.save();
                        }
                    }
                    else {
                        res.status(403).send({success: true, meassage: error.Password_Encryption_Error});
                    }
                }
            );
        }
    });
};
