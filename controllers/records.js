var express = require('express'),
    router = express.Router(),
    session = require('express-session'),
    mongoose = require('mongoose'),
    Record = require('../models/recordModel.js'),
    User = require('../models/userModel.js');

    router.use(session({
      secret: "phantomphildius",
      resave : true,
      saveUninitialized: true
    }));
    
  router.post('/new', function (req, res) {
    var newRecord = new Record({
      author: req.session.currentUser.name,
      complaint: req.body.complaint,
      bodySystem : req.body.bodySystem,
      description : req.body.description,
      treatment: req.body.treatment,
      date: req.body.date
    })
    console.log(newRecord);

    newRecord.save(function (err, saveRecord) {
      if (err) {
        res.json({error: "There was an error: " + err});
      } else {
        res.json({record: saveRecord})
      }
    })
  });

  router.get('/all', function (req, res) {
    Record.find({}, function (err, records) {
      console.log(records);
      res.json(records)
    });
  });

module.exports = router;
