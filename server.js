/**
 * Created by Zem on 2014-11-10.
 */
// set up ========================
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var userService = require('./lib/user/user-service-adapter');
var itemService = require('./lib/items/item-service');

// configuration =================
mongoose.connect('mongodb://meetme:pppingla@ds063889.mongolab.com:63889/meetmedb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Database connected');
});


app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/uploads',  express.static(__dirname + '/uploads'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.set('port', (process.env.PORT || 8080));

// start app ======================================
app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});

app.get('/user/auth', function(req, res){
    userService.auth(req, res);
});

app.get('/item/list', function(req, res){
    itemService.listItems( function(error, items){
        if(error){
            console.log(error);
            res.send(error);
        }else{
            res.json(items);
        }
    });
});

app.post('/item/save', function(req, res){

    itemService.saveItem(req.body.item, function(error, item){
        if(error){
            console.log(error);
            res.send(error);
        }else{
            res.json(item);
        }
    });
});

app.get('*', function(req, res) {
    console.log('index');
    res.sendfile(__dirname +'/public/index.html');
});