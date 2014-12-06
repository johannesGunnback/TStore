/**
 * Created by Zem on 2014-11-10.
 */
var mongoose = require('mongoose');

var service = {
    createUser: function(username, password, callback){
        var user = new User({
            name: username,
            password: password
        });
        user.save(callback);
    },
    listUsers: function(callback){
        User.find(callback);
    },
    search: function(q, callback){
        User.find({'name' : new RegExp(q, 'i')}, callback);
    },
    userExists: function(username, callback){
        User.find({ name: username }, function(error, users){
            if(users && users.length != 0){
                callback(error, true);
            }else{
                callback(error, false);
            }
        });
    },
    getUser: function(username, callback){
        User.find({ name: username }, function(error, users){
            if(users && users.length != 0){
                callback(error, users[0]);
            }else{
                callback(error);
            }
        });
    }

}

var User =  mongoose.model('User',{
    name: String,
    password: String
});

module.exports = service;