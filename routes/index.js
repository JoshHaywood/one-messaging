var express = require('express');
var router = express.Router();
var crypto = require('crypto');

//SQL queries
const SQL_GET_USERS = 'SELECT * FROM users'; 
const SQL_DROP_TABLE = 'DROP TABLE IF EXISTS `users`';
const SQL_CREATE_TABLE = 'CREATE TABLE `users` (firstname varchar(255), lastname varchar(255), username varchar(255) UNIQUE, password varchar(255), salt varchar(255))';
const SQL_SELECT_USERNAMES = 'SELECT * FROM `users` WHERE username = ?';
const SQL_INSERT_ROW = 'INSERT INTO `users` VALUES(?, ?, ?, ?, ?)';

//Salted hashing
const iterations = 1000;
const salt = crypto.randomBytes(256).toString('hex');
const hashSize = 64; 
const hashAlgo = 'sha256';  

//Returns salted hash strings, password is in place of either the already stored password of the request and salt is the generated salt
function HashPassword(password, salt) {
  return hash = crypto.pbkdf2Sync(password, salt, iterations, hashSize, hashAlgo).toString('hex'); //Returns hash as the completed salted hash
}

//----------------------------------------------------------------------------------------------- ROUTES -----------------------------------------------------------------------------------------------

//#region Routes

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'One Messaging'});
});

/* GET users page */
router.get('/users', (req, res, next) => {
  let db = req.app.locals.db; 

  //Error handling
  db.all(SQL_GET_USERS, [], (err, rows) => {
    res.render('db', { "rows": rows }); 
  });
});

//#endregion

//----------------------------------------------------------------------------------------------- DATABASE -----------------------------------------------------------------------------------------------

//#region Database

/* Setup */
router.get('/setup', function(req, res, next) { // Database endpoint /setup
  let db = req.app.locals.db;
  db.serialize(() => {
    db.run(SQL_DROP_TABLE); // Removes table if it already exists
    db.run(SQL_CREATE_TABLE); //Username is unique to prevent duplicates
    
    let rows = [];

    rows.forEach( (row) => { // For each row assign the corresponding variable
      db.run('INSERT INTO `users` VALUES(?, ?, ?, ?, ?)', row); 
    });
  });

  res.statusCode = 302; 
  res.setHeader('Location', 'http://localhost:8080');
  res.end(); 
});

//----------------------------------------------------------------------------------------------- REGISTERING -----------------------------------------------------------------------------------------------

/* Registering */
router.post('/registered', function(req, res, next) { 
  let db = req.app.locals.db; 
  var form = req.body; 

  //Validation
  var upperCaseCharacters = /[A-Z]/g;
  var numbers = /[0-9]/g;
  var heading = "An error has occured";
  
  //If fields are empty
  if (!form.firstname || !form.lastname || !form.username || !form.password) {
    message =  'Form field is empty please fill out all fields including room you wish to join or create.'; 
    res.render('error', {heading, message}); //Renders error page with message
  }

  //If fields arent empty but password doesnt contain capital
  if (form.firstname.length > 0 && form.lastname.length > 0 && form.username.length > 0 && form.password.length > 0 && !form.password.match(upperCaseCharacters)) {
    message = 'Password must contain an upper case letter'; 
    res.render('error', {heading, message}); //Renders error page with message
  }

  //If fields arent empty but password doesnt contain number
  else if (form.firstname.length > 0 && form.lastname.length > 0 && form.username.length > 0 && form.password.length > 0 && !form.password.match(numbers)) {
    message = 'Password must contain a number'; 
    res.render('error', {heading, message}); //Renders error page with message
  }

  //If password is too short
  else if (form.firstname.length > 0 && form.lastname.length > 0 && form.username.length > 0 && form.password.length > 0 && form.password.length < 7) {
    message = 'Password must be at least eight letters'; 
    res.render('error', {heading, message}); //Renders error page with message
  }

  //If username entered
  if (form.username) {
    //Get all usernames from database
    db.get(SQL_SELECT_USERNAMES, [form.username], function(err, row) {
      //If the request matches the database
      if (row) {  
        message = 'This username already exists'; 
        res.render('error', {heading, message}); //Renders error page with message   
      }

      else {
        //Creates hashedPassword as the request once hashed with a salt
        var hashedPassword = HashPassword(form.password, salt);

        //Insert rows
        let row = [form.firstname, form.lastname, form.username, hashedPassword, salt]; 
        db.run(SQL_INSERT_ROW, row, function(err){ 
          message = 'Please login';

          res.render('index', {title: 'One Messaging', message}); //Renders with username and room
        });
      }
    });
  }
});

//----------------------------------------------------------------------------------------------- LOGIN -----------------------------------------------------------------------------------------------

/* Login */
router.post('/chat', function(req, res, next) {
  let db = req.app.locals.db; 
  var form = req.body; 

  //Validation
  var heading = 'An error has occured';

  //If fields are empty
  if (!form.username || !form.password || !form.room) {
    message =  'Form field is empty please fill out all fields including room you wish to join or create.'; 
    res.render('error', {heading, message}); //Renders error page with message
  }

  //Else fields arent empty
  else if (form.username && form.password) {
    //Check all usernames in database against requested username
    db.get(SQL_SELECT_USERNAMES, [form.username], function(err, row) { 
      
      //If the request matches the database and the database password matches the given password when hashed with the stored salt
      if (row && row.password == HashPassword(form.password, row.salt)) {  
        res.render('chatbox', {title: 'One Messaging', username: form.username, room:form.room}); //Renders with username and room
      }

      //Else doesnt match
      else {
        message = 'Username or password doesnt match, please check you have spelt it correctly or register.'; 
        res.render('error', {heading, message}); //Renders error page with message   
      }
    });
  };
});


module.exports = router;
