var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//connect to database
mongoose.connect('mongodb+srv://admin:pWBGt88@cluster0-mfifk.mongodb.net/test?retryWrites=false');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemRouter = require('./routes/items');

var app = express();

//Bodyparse MW
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middleware that works as filter
app.use('/items', itemRouter);
app.use('/users',usersRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods','PUT, PATCH, POST, GET, DELETE');
        return res.status(200).json({});

    }
});
app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(req, res, next) {
    var error = new Error("not found");
    error.status = 404;
    next(error);
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    //res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    //res.render('error');
});
module.exports = app;
