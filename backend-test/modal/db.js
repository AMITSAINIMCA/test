var bluebird = require('bluebird');
var mongoose = require('mongoose');
mongoose.Promise = bluebird
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true })
    .then((res) => {
        console.log("Mongodb Connectted");
    }).catch((err) => {
        console.log(err);
        console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/test`);
    });