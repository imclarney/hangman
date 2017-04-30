(function() {
 
  'use strict';
  var express = require('express');
  var router = express.Router();
  var mongojs = require('mongojs');
  var db = mongojs('meanHangman', ['games']);
 
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index');
  });
 
  router.get('/api/games', function(req, res) {
    db.games.find(function(err, data) {
      res.json(data);
    });
  });
 
  router.post('/api/games', function(req, res) {
    db.games.insert(req.body, function(err, data) {
      res.json(data);
    });
 
  });
 
  router.put('/api/games', function(req, res) {
 
    db.games.update({
      _id: mongojs.ObjectId(req.body._id)
    }, {
      word: req.body.word,
      status: req.body.status
    }, {}, function(err, data) {
      res.json(data);
    });
 
  });
 
  router.delete('/api/games/:_id', function(req, res) {
    db.games.remove({
      _id: mongojs.ObjectId(req.params._id)
    }, '', function(err, data) {
      res.json(data);
    });
 
  });
 
  module.exports = router;
 
}());