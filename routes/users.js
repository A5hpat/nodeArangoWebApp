var express = require('express');
var router = express.Router();
var service = require('../services/DataServices.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
   console.log("↓↓↓↓ Getting User lists ↓↓↓↓");
  // geting user list from data Service
  service.getAllUsers().then(
    function (list) {
      console.log(list);
      //render userlist view with list if user
      res.render('userlist', { "userlist": list });
    },
    function (err) {
      console.error('Something went wrong:', err);
      res.send("There was a problem adding the information to the database. " + err);
    }
    );
  //res.send('respond with a resource');
});
/* GET New User page. */
router.get('/newuser', function (req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {
  console.log("↓↓↓↓ Add New User ↓↓↓↓");  
  // Get our form values. These rely on the "name" attributes   
  var user = {
    "username": req.body.username,
    "email": req.body.useremail
  };
  service.addUser(user)
    .then(
      function (result) { console.log(result); res.redirect("/users"); },
      function (err) {
        console.error('Something went wrong:', err);
        res.send("There was a problem adding the information to the database. " + err);
      }
      );
});

/* GET User by key. */
router.get('/:key', function (req, res) {
  console.log("↓↓↓↓ Get User by Key ↓↓↓↓");
  // Get key value form url 
  var userkey = req.params.key;
  service.getUserByKey(userkey)
    .then(function (list) {
      console.log(list);
      res.render('userinfo', { "user": list[0] });
    },
      function (err) {
        console.error('Something went wrong:', err);
        res.send("There was a problem adding the information to the database. " + err);
      }
      );
});
router.get('/:key/delete', function (req, res) {
  console.log("↓↓↓↓ Delete User ↓↓↓↓");
  var userkey = req.params.key;
  service.removeUser(userkey)
    .then(function (list) {
      console.log(list);
      res.redirect("/users");
    },
      function (err) {
        console.error('Something went wrong:', err);
        res.send("There was a problem adding the information to the database. " + err);
      }
      );
});

/* GET to Update User */
router.get('/:key/update', function (req, res) {
  console.log("↓↓↓↓ Get User by Key for Update ↓↓↓↓");

  var userkey = req.params.key;
  service.getUserByKey(userkey)
    .then(function (list) {
      console.log(list);
      res.render('userupdate', { "user": list[0] });
    },
      function (err) {
        console.error('Something went wrong:', err);
        res.send("There was a problem adding the information to the database. " + err);
      }
      );
});

/* POST to update User */
router.post('/:key/update', function (req, res) {
  console.log("↓↓↓↓ Update User ↓↓↓↓");
  var user = {
    "key": req.params.key,
    "username": req.body.username,
    "email": req.body.useremail
  };
  service.updateUser(user)
    .then(
      function (result) { console.log(result); res.redirect("/users"); },
      function (err) {
        console.error('Something went wrong:', err);
        res.send("There was a problem adding the information to the database. " + err);
      }
      );
});
module.exports = router;
