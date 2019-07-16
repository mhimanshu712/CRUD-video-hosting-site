const mongoose = require('mongoose');

var conString= "mongodb://upgzjiozupezohnn0py3:jhINOuAepZOxNAGBBK7G@b5x4r2r6h6rmywn-mongodb.services.clever-cloud.com:27017/b5x4r2r6h6rmywn";
mongoose.connect(conString,{useNewUrlParser:true});

var junkvideoSchema = new mongoose.Schema({title:String,link:String,story:String,likes:Number,comments:Array,share:String});
var Junkvideo = mongoose.model("Junkvideo",junkvideoSchema);

/*Junkvideo.create({title:"How We Could Build a Moon Base TODAY | Space Colonization | Kurz",link:"https://www.youtube.com/embed/NtQkz0aRDe8",story:"To support Kurzgesagt and learn more about Brilliant, go to https://www.brilliant.org/nutshell and sign up for free. The first 688 people that go to that link will get 20% off the annual Premium subscription."},function(err,obja){
    if(!err){
        console.log(obja);
    }
});*/

Junkvideo.find({},function(err,obja){
	if(!err){
		console.log(obja);
	}
});
