const express = require('express'); 
const router = express.Router(); 

const mongoose = require('mongoose');
const Code = require('../models/code');
const  authCheck = require('../middleware/auth-check');
const jwt = require('jsonwebtoken');

router.get('/', authCheck, (req, res, next) => {
        const JWT_KEY = "codingapp";
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY);
        let user_id = decoded.userId;

        Code.findOne({userId: user_id})
            .exec().then(response => {
                res.status(200).json({
                    count: response.length,
                    response: response
                });
            }).catch(err => {
                res.status(200).json({response: err});
        });
});

router.post('/', authCheck, (req, res, next) => {
        const JWT_KEY = "codingapp";
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY);
        let user_id = decoded.userId;

    const code = new Code({
        _id: new mongoose.Types.ObjectId(),
        userId: user_id,
        title: req.body.title,
        tag: req.body.tag,
        language: req.body.language,
        description: req.body.description,
        category: req.body.category,
        design: req.body.design,
        html: req.body.html,
        css: req.body.css,
        script: req.body.script,
        image: req.body.image,
        link: req.body.link
    });
    code.save().then(response => {
         res.status(201).json({
        msg: "Code successfully uploaded!",
        response: response
    });
}).catch(err => { 
        res.status(500).json({
            error: "err",

        });
    }); 
});


//get by id 
router.get('/:codeId', authCheck, (req, res, next) => {
    const id = req.params.codeId;
    Code.findById(id)
        .exec().then(response => {
        res.status(200).json({response});
    }).catch(err => {
        res.status(500).json({error: err});
    });
});

router.put('/:codeId', authCheck, (req, res, next) => {
    const id = req.params.codeId;
    const updateOps = {
        title: req.body.title,
        tag: req.body.tag,
        language: req.body.language,
        description: req.body.description,
        category: req.body.category,
        design: req.body.design,
        html: req.body.html,
        css: req.body.css,
        script: req.body.script,
        image: req.body.image,
        link: req.body.link
    };
    Code.update({ _id: id }, { $set: updateOps })
            .exec()
            .then(response => {
                 res.status(200).json({
                response: response,
                 msg: 'Code is updated!'
                });
            })
            .catch(err =>  res.status(500).json({error: err}));
   
});

//handle delete request
router.delete('/:codeId', (req, res, next) => {
    Code.remove({ _id: req.params.codeId })
         .exec()
         .then(response => {
            res.status(200).json({
                msg: 'Code deleted',
                response: response
            });
         })
         .catch(err => {
             res.status(500).json({
                 error: err
             });
         });
});

module.exports = router;
