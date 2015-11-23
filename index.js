var express = require('express'),
    server = express(),
    PORT = process.env.PORT || 8000,
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    db = 'taz',
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    session = require('express-session'),
    bcrypt = require('bcryptjs'),
    Record = require('./models/recordModel.js')

server.use(express.static('./public'));

server.use(methodOverride('_method'));

server.use(bodyParser.json());

// server.use(bodyParser.urlencoded( {
//   extended: true
// }));

server.use(morgan('dev'));

// server.use('/', function (req, res) {
//   res.render('index');
// });

mongoose.connect(MONGOURI + "/" + db);
mongoose.set('debug', true)
server.listen(PORT, function () {
  console.log("ayyyyyyy we on port " + PORT);
});
