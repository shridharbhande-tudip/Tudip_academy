var express = require('express');
var app = express();
var apiRoutes = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../app/models/user');
var Visitor = require('../app/models/visitor');
var isEmpty = require('validate.io-empty');
var validator = require("email-validator");
var remove = require('remove');
var now = require("date-now");

app.set('superSecret', config.secret);
require('../app/models/user');
var error=require('../helper/error_messages');

//add visitor to Database
exports.add = function (req, res) {
    console.log(req.body);

    var mail = validator.validate(req.body.email.trim());
    if (req.body.name && req.body.email && req.body.phone_no) {

        User.find({token: req.headers.token}, function (err, isMatch) {
            if (err) {
                res.status(400).send({'error': true, 'message': error.Token_Not_Found_Error});
            }
            if (isMatch.length === 0) {
                res.status(400).send({'error': true, 'message': error.User_Not_Found});
            }
            else {
                jwt.verify(req.headers.token, app.get('superSecret'), function (err) {
                    if (err) {
                        res.status(401).send({'error': true, 'message': error.Session_Expired_Error});
                    }
                    else {
                        console.log(isMatch[0]._id);
                        var user_id = isMatch[0]._id;
                        //sample user
                        var visitor = new Visitor();
                        visitor.name = req.body.name;
                        visitor.email = req.body.email.trim();
                        visitor.phone_no = req.body.phone_no;
                        visitor.in_time = Date.now();
                        visitor.out_time = Date.now();
                        visitor.user_id = user_id;

                        if (mail) {
                            if (isNaN(req.body.name)) {
                                if (req.body.phone_no.length === 10) {
                                    visitor.save(function (err) {
                                        if (err) {
                                            res.status(400).send({'message': error.Incorrect_Input_data_Error});
                                        }
                                        else {

                                            res.status(201).send({'message': error.Visitor_Created_Successfully});
                                        }
                                    });

                                }
                                else {
                                    res.status(400).send({'error': true, 'message': error.Phone_no_Error});
                                }
                            }
                            else {
                                res.status(400).send({'error': true, 'message': error.Incorrect_Name_Error});
                            }
                        }
                        else {
                            res.status(400).send({'error': true, 'message': error.Incorrect_Mail_Error});
                        }
                    }

                });
            }
        })
    }
    else {
        res.status(400).send({'error': true, 'message': error.Incorrect_Input_data_Error});
    }
};


//delete visitor from Database
exports.delete = function (req, res) {
    console.log(req.body);


    User.find({token: req.headers.token}, function (err, isMatch) {
        if (err) {
            res.status(500).send({'error': true, 'message': error.INTERNAL_SERVER_ERROR});
        }
        if (isMatch.length === 0) {
            res.status(400).send({'error': true, 'message': error.User_Not_Found});
        }
        else {

            jwt.verify(req.headers.token, app.get('superSecret'), function (err) {
                if (err) {
                    res.status(401).send({'error': true, 'message': error.Session_Expired_Error});
                }
                else {
                    var id = req.params.id;
                    Visitor.remove({'_id': id}, function (err) {
                        console.log({'visitor id is=': id});
                        if (err) {
                            res.status(500).send({'error': true, 'message': error.INTERNAL_SERVER_ERROR});
                        }
                        else {
                            console.log('deleted_successfully');
                            res.status(201).send({'message': error.Successfully_Delete_Visitor});
                        }

                    });
                }
            });

        }
    });

};


//Update visitor using token and user_id

exports.update = function (req, res) {
    console.log(req.body);
    var mail = validator.validate(req.body.email);
    User.find({token: req.headers.token}, function (err, isMatch) {
        if (err) {
            res.status(500).send({'error': true, 'message': error.INTERNAL_SERVER_ERROR});
        }
        if (isMatch.length === 0) {
            res.status(400).send({'error': true, 'message': error.User_Not_Found});
        }
        else {
            jwt.verify(req.headers.token, app.get('superSecret'), function (err) {
                if (err) {
                    res.status(401).send({'error': true, 'message': error.Session_Expired_Error});
                }
                else {

                    var id = req.params.id;
                    Visitor.find({'_id': id}, function (err, visitor) {
                        console.log(id);
                        if (err) {
                            res.status(500).send({'error': true, 'message': error.INTERNAL_SERVER_ERROR});
                        }
                        else if (visitor.length === 0) {
                            // console.log('visitor find successfully');
                            res.send({'error': true, 'message': error.Visitor_Not_Found});
                        }
                        else {
                            if (req.body.name) {
                                visitor[0].name = req.body.name;

                            }
                            if (req.body.email) {
                                visitor[0].email = req.body.email;

                            }
                            if (req.body.phone_no) {
                                visitor[0].phone_no = req.body.phone_no;

                            }
                            if (req.body.in_time) {
                                visitor[0].in_time = Date.now();

                            }
                            if (req.body.out_time) {
                                visitor[0].out_time = Date.now();


                            }
                             visitor[0].save(function (err) {
                                if (err) {
                                    res.status(500).send({'error': true, 'message': error.INTERNAL_SERVER_ERROR});
                                }
                                res.status(201).send({success: true});

                            });
                        }
                    });
                }
            });
        }
    });
};


// find specific visitor using token and user_id

exports.find_id = function (req, res) {

    User.find({token: req.headers.token}, function (err, isMatch) {

        if (err) {
            res.status(500).send({'error': true, 'message': error.INTERNAL_SERVER_ERROR});
        }
        if (isMatch.length === 0) {
            res.status(400).send({'error': true, 'message': error.User_Not_Found});
        }
        else {
            jwt.verify(req.headers.token, app.get('superSecret'), function (err) {
                if (err) {
                    res.status(401).send({'error': true, 'message': error.Session_Expired_Error});
                }
                else {
                    var id = req.params.id;
                    Visitor.find({'_id': id}, function (err, visitor) {
                        console.log(id);
                        if (err) {
                            res.status(500).send({'error': true, 'message': error.INTERNAL_SERVER_ERROR});
                        }
                        else if (visitor.length === 0) {

                            res.send({'error': true, 'message': error.Visitor_Not_Found});
                        }
                        else {

                            console.log("Successfully find user by ID");
                            res.status(200).send({"Specific visitor": visitor[0]});

                        }

                    });
                }
            });
        }

    })

};


//find all visitors using token
exports.findAll = function (req, res) {

    User.find({token: req.headers.token}, function (err, isMatch) {

        if (err) {
            res.status(500).send({'error': true, 'message': error.INTERNAL_SERVER_ERROR});
        }
        if (isMatch.length === 0) {
            res.status(400).send({'error': true, 'message': error.User_Not_Found});
        }
        else {
            jwt.verify(req.headers.token, app.get('superSecret'), function (err) {
                if (err) {
                    res.status(400).send({'error': true, 'message': error.Session_Expired_Error});
                }
                Visitor.find({'user_id': isMatch[0]._id}, function (err, visitor) {
                    console.log(isMatch[0]._id);
                    if (err) {
                        res.status(500).send({'error': true, 'message': error.INTERNAL_SERVER_ERROR});
                    }
                    else if (visitor.length === 0) {
                        // console.log('visitor find successfully');
                        res.send({'error': true, 'message': error.Visitor_Not_Found});
                    }
                    else {
                        console.log("Successfully find user by ID");
                        res.status(200).send(visitor);

                    }

                });
            });

        }

    })

};
