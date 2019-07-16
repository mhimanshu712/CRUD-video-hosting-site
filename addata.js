const mongoose = require('mongoose');

var conString= "mongodb://upgzjiozupezohnn0py3:jhINOuAepZOxNAGBBK7G@b5x4r2r6h6rmywn-mongodb.services.clever-cloud.com:27017/b5x4r2r6h6rmywn";
mongoose.connect(conString,{useNewUrlParser:true});

var junkvidSchema = new mongoose.Schema({title:String,image:String,views:Number,link:String})
var Junkvid = mongoose.model("Junkvid",junkvidSchema);

// Junkvid.create({title:"Life Under Ice | Roffo Miller",image:"2.jpg",views:26},function(err,obje){
//     if(!err){
//         console.log("Object added:\n");
//         console.log(obje)
//     }
// });

Junkvid.find({},function(err,obja){
    if(!err){
         console.log(obja);
     }
 });
