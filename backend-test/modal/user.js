var mongoose = require('mongoose');
//var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
//var mongoosePaginate = require('mongoose-paginate');
var UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    country_code: {
        type: String,
        trim: true
    },
    mobile: {
        type: String,
        trim: true
    }, 
    password: {
        type: String,
        required: true,
        trim: true
    }, 
    usertype: {
        type: Number,
        required: true,
        trim: true,
        default: 1
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//UserSchema.plugin(mongooseAggregatePaginate);
//UserSchema.plugin(mongoosePaginate);
/*UserSchema.post('save', function(doc) {
    if(doc && typeof doc._id!='undefined' && doc._id!==null && doc._id!=""){
        console.log("user Pusher here");
    }
});*/
var Users = mongoose.model('User', UserSchema);
module.exports = Users;