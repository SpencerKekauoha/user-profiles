var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config.js');
var app = express();
var corsOptions = {
    origin: 'http://localhost:4000'
};
var profileCtrl = require('./controllers/profileCtrl.js');
var userCtrl = require('./controllers/userCtrl.js');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());
app.use(cors(corsOptions));
app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: true
}));
app.use(function(req, res, next){
  console.log(req.session);
  next();
});

app.post('/api/login', userCtrl.login);
app.get('/api/profiles', profileCtrl.getProfile);






var port = 4000;
app.listen(port, function(){
  console.log('listening to port', port);
});
