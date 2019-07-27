var mongoose =              require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    userfullname:String,
    username: String,
    password: String,
    userimage:{type:String,default:'/images/patrick.png'}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);