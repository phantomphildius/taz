var express = require('express'),
    server = express(),
    PORT = process.env.PORT || 5432,
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    db = taz,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    expressLayouts = require('express-ejs-layouts'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    session = require('express-session'),
    bcrypt = require('bcryptjs');

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(express.static('./public'));

server.use(methodOverride('_method'));

server.use(bodyParser.json());

server.use(bodyParser.urlencoded( {
  extended: true
}));

server.use(morgan('dev'));

server.use(expressLayouts);

server.get('/user/doctor/login', function (req, res) {
  res.render('user/doctor/login');
})

server.get('/user/patient/login', function (req, res) {
  res.render('user/patient/login');
})

server.use('/', function (req, res) {
  res.render('home');
})

mongoose.connect(MONGOURI + "/" + dbname);
mongoose.set('debug', true)
server.listen(PORT, function () {
  console.log("ayyyyyyy");
});
