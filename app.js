var createError = require('http-errors');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io')
var formatMessage = require('./utilities/messages')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); 
var sqlite3 = require('sqlite3').verbose();
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { MemoryStore } = require('express-session');

var app = express();

//SocketIO server setup
const server = http.createServer(app);
const io = socketIO(server);

server.listen(8080, () => {
  console.log('listening on 8080');
});

// SQL file setup
let db = new sqlite3.Database('./database/users.db'); //Creates local database file
app.locals.db = db; 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//----------------------------------------------------------------------------------------------- SESSIONS -----------------------------------------------------------------------------------------------

/* Session setup */
app.use(cookieParser());
var store = new MemoryStore;

app.use(session({  
  secret: "session secret",
  resave: false, 
  saveUninitialized: false, //Prevents session instance persisting unneccesarily
  cookie: { expires: 1000 * 60 * 60 * 24 }, //Cookie expieration one day
  store: store
}));

//Uses same post request as register to setup a session on register
app.post('/', function(req, res){
  req.session.page_views++;

  console.log(store.sessions);
  res.render('chatbox', {session})
});

// Session setup had to be before router use to avoid header sent before call error
app.use('/', indexRouter);
app.use('/users', usersRouter);

//----------------------------------------------------------------------------------------------- SOCKET -----------------------------------------------------------------------------------------------

const bot = 'Admin';

sessionUsernames = {} //{socketID: username}; // {socket: session ID} then use session id to correlate to user

io.on('connection', socket => {
  socket.emit('message', formatMessage(bot, "Welcome :)"));

  //Function to assign a session ID and username to users
  socket.on('socketID', function(data) {
    var username = data.username;
    var socketID = socket.id;
    sessionUsernames[socketID] = username;
    
    //Logs unique ID
    console.log(socketID);

    //Emits connect messages to all users except connecting user
    socket.broadcast.emit('message', formatMessage(bot, "User " + username + " Connected"));

    socket.broadcast.emit('username', formatMessage(username));

    //Emits disconnect message to all users
    socket.on('disconnect', () => {
    delete sessionUsernames[socket.id];
    io.emit('message', formatMessage(bot, "User " + username + " Disconnected"));
    });
  });

  //Emits message from server
  socket.on('formMessage', (messageInput) => {
    var username = sessionUsernames[socket.id]
    io.emit('message', formatMessage(username, messageInput));
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  heading = "This page does not exist" ;
  message = "The page you were looking for does not exist or has been removed";

  // render the error page
  res.status(err.status || 500);
  res.render('error', {heading, message});
});

module.exports = app;
