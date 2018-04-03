const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');
const config = require('./config/config');

// Set up Mongoose
mongoose.connect(config.db, function () {
    console.log(config.db + ' connected.');
});
mongoose.Promise = global.Promise;
// autoIncrement.initialize(mongoose.connect);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);

app.use('/', require('./server/static'));

app.use('/login', require('./server/api/login/loginController'));
app.use('/logout', require('./server/api/logout/logoutController'));

app.use('/user', require('./server/api/user/userController'));

app.use('/category', require('./server/api/category/categoryController'));
// app.use('/account', require('./server/api/account/accountContoller'));

// app.use('/department', require('./server/api/department/departmentController'));



app.listen(4000, function () {
    console.log('Server On Port 4000');
});