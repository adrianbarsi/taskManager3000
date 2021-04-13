var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mysqlDB = require('./connection');
mysqlDB.connect();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var timeEntryRouter = require('./routes/timeEntry');
var timeOffRouter = require('./routes/timeOff');
var departmentsRouter = require('./routes/departments');
var employeeTypesRouter = require('./routes/employeeTypes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/timeEntry', timeEntryRouter);
app.use('/api/timeOff', timeOffRouter);
app.use('/api/departments', departmentsRouter);
app.use('/api/employeeTypes', employeeTypesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
