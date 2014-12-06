/**
 * Created by Zem on 2014-11-10.
 */
var service = require('./user-service')
var atob = require('atob');
var bcrypt = require('bcrypt');

var adapter = {
    auth: function(req, res){
        var userpass = atob(req.param('token'))
        var username = userpass.split(':')[0];

        service.getUser(username, function(error, user){
            if(error){
                res.send(error);
            }
            bcrypt.compare(userpass, user.password, function(err, valid) {
                if(valid){
                    res.json(ExternalUser(user));
                }else{
                    res.json(Error('Invalid user och password'));
                }
            });
        });
    },
    create: function(req, res){
        var userpass = atob(req.param('token'))
        var username = userpass.split(':')[0];
        service.userExists(username, function(error, exists){
            if(error){
                res.send(error);
            }
            if(exists){
                res.json(Error('User already exists'));
            }else{
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(userpass, salt, function(err, hash) {
                        service.createUser(username, hash, function(error, user){
                            if(error){
                                res.send(error);
                            }else{
                                res.json(ExternalUser(user));
                            }
                        });
                    });
                });

            }
        })
    },
    search: function(req, res){
        var query = req.param('query');
        service.search(query, function(error, users){
            if(error){
                res.send(error);
            }else{
                res.json(mapUsers(users));
            }
        });
    }
}

function mapUsers(users){
    var result = [];
    users.forEach(function(user){
        result.push(ExternalUser(user));
    });
    return result;
}

var ExternalUser = function(user){
    return {name: user.name, id: user._id};
}
var Error = function(text){
    return {error : text};
}

module.exports = adapter;