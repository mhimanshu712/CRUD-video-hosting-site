const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var conString= "mongodb://upgzjiozupezohnn0py3:jhINOuAepZOxNAGBBK7G@b5x4r2r6h6rmywn-mongodb.services.clever-cloud.com:27017/b5x4r2r6h6rmywn";
mongoose.connect(conString,{useNewUrlParser:true});

var junkvidcollection = "trialvid";
var junkvideocollection = "trialvideo";

function usedb(a,callback){
    junkvidcollection = junkvidcollection + a;

    junkvidSchema = new mongoose.Schema({title:String,image:String,views:Number,link:String})
    Junkvid = mongoose.model(junkvidcollection,junkvidSchema);

    callback();
}

usedb("2");
function fuck(callback){
    Junkvid.create({title:"errortest",image:"1.jpg",views:0,link:"somelink"},function(err,objb){
        console.log("\n***Creating\n");
        if(!err){
            console.log(objb);
        }
    });
    callback();

}

function junk(another){
    Junkvid.find({},function(err,obja){
        console.log('\n***Finding\n');
        if(!err){
            console.log(obja);
        }
    });

    another();
}

usedb("3",junk(funk));

