var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const client = require('prom-client'); // Import prom-client

var messageRoutes = require("./routes/messageRoutes");
var eventRouter = require('./routes/events');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var facebookRouter = require('./routes/facebook');
var clubsRouter = require('./routes/clubs');
var paymentRouter = require('./routes/payment');
var payEventRouter = require('./routes/PaymentEvent');
var chatRouter = require('./routes/chatRoutes');

var connectDB = require('./database/db');

//Connect to MongoDB
connectDB();

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up prom-client to collect default metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Example custom metric
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 300, 400, 500, 600, 800, 1000]
});

app.use((req, res, next) => {
  const startEpoch = Date.now();
  res.on('finish', () => {
    const responseTimeInMs = Date.now() - startEpoch;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route ? req.route.path : req.originalUrl, res.statusCode)
      .observe(responseTimeInMs);
  });
  next();
});

// Add the /metrics route
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/clubs', clubsRouter);
app.use('/api/auth/facebook', facebookRouter);
app.use('/api', paymentRouter);
app.use('/api/events', eventRouter);
app.use('/chat', chatRouter);
app.use('/payevent', payEventRouter);
app.use("/message", messageRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Add the title variable
  res.locals.title = 'Error';

  res.status(err.status || 500);
  res.render('error');
});

const http = require('http').Server(app);
const io = require('socket.io')(http, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

module.exports = app;
