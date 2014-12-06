/**
 * Created by Zem on 2014-11-10.
 */
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var fileSystem = require('fs');
ObjectId = mongoose.Types.ObjectId;

var service = {
    saveItem: function(itemdata, callback){
        var item = new Item(itemdata);
        console.log(item);
        if(itemdata.imgsrc && itemdata.imgsrc.length != 0){
            var imageBuffer = decodeBase64Image(itemdata.imgsrc);
            var fileName = uuid.v1();
            var type = imageBuffer.type;
            var filePath = 'uploads/'+ fileName + '.' + type;
            fileSystem.writeFile(filePath, imageBuffer.data, function(err) {
                item.img = filePath;
                persistItem(item, callback);
            });
        }else{
            persistItem(item, callback);
        }
    },
    listItems: function(callback){
        Item.find(callback);
    }

}

function persistItem(item, callback){
    if(item._id){
        var upsertData = item.toObject();
        delete upsertData._id;
        Item.update({_id: item._id}, upsertData, {upsert: true}, function(error){
            callback(error, item);
        });
    }else{
        item.save(callback);
    }
}

function decodeBase64Image(dataString) {

    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};

    if (matches.length !== 3) {
        console.log('Invalid input string');
        return new Error('Invalid input string');
    }

    response.type = matches[1].split('/')[1];
    response.data = new Buffer(matches[2], 'base64');
    return response;
}

var Item =  mongoose.model('Item',{
    name: String,
    anr: String,
    price: String,
    img: String
});

module.exports = service;