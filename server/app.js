const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const jwtStrategy = require('./strategies/jwt');
const usersRouter = require('./routes/users');
const conversationRouter = require('./routes/conversation');
const communityRouter = require('./routes/community');
const authRouter = require('./routes/auth');

require('dotenv').config();
require('./config/database.config');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

passport.use(jwtStrategy);
app.use(cors());
app.use(express.static('public'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/communities', communityRouter);
app.use('/conversations', conversationRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* TO-DO: Move back to bin after */
var debug = require('debug')('server:server');
var http = require('http');
const { Server } = require('socket.io');
/**
 * Get port from environment and store in Express.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// TO-DO: move this inside socket controller in the future
io.on('connection', (socket) => {
  console.log('connected');
  socket.on('send_message', ({ id, message }) => {
    io.to(id).emit('receive_message', message);
  });

  // join new server is called when a community is created / joined
  socket.on('join_new_community', (community) => {
    socket.emit('add_server_icon_sidebar', community);
  });

  socket.on('create_new_conversation', (conversation) => {
    socket.emit('add_new_conversation_sidebar', conversation);
  });

  socket.on('join_chatroom', (communityId) => {
    // user can only be in one room at a time
    const amtOfRooms = socket.rooms.size;
    if (amtOfRooms > 0) {
      const [room] = socket.rooms;
      socket.leave(room);
    }

    socket.join(communityId);
  });
});

server.listen(port);
