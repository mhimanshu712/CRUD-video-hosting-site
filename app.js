const express = require('express');
const app = express();
const mongoose = require('mongoose');

var conString= "mongodb://upgzjiozupezohnn0py3:jhINOuAepZOxNAGBBK7G@b5x4r2r6h6rmywn-mongodb.services.clever-cloud.com:27017/b5x4r2r6h6rmywn";
mongoose.connect(conString,{useNewUrlParser:true});

var junkvidSchema = new mongoose.Schema({title:String,image:String,views:Number})
var Junkvid = mongoose.model("Junkvid",junkvidSchema);

var junkvideoSchema = new mongoose.Schema({title:String,link:String,story:String,likes:Number,comments:Array,share:String});
var Junkvideo = mongoose.model("Junkvideo",junkvideoSchema);

app.use(express.static('public'));
app.set("view engine","ejs");

app.get('/',function(req,res){
    Junkvid.find({},function(err,obja){
        if(!err){
            res.render('recommended',{vidlis:obja,vidcat:1});
        }
    });
    
});

app.get('/video/:vidid',function(req,res){
    var vidid = req.params.vidid;
    Junkvideo.findOne({_id:vidid},function(err,obja){
        if(!err){
            res.render('video',{video:obja});
            console.log(obja);
        }
    });
});

app.get('/latest',function(req,res){
    Junkvid.find({},function(err,obja){
        if(!err){
            res.render('recommended',{vidlis:obja,vidcat:2});
        }
    });
});

app.get('/mostviewed',function(req,res){
    Junkvid.find({},function(err,obja){
        if(!err){
            res.render('recommended',{vidlis:obja,vidcat:3});
        }
    });
});

app.get('/guestmoderror',function(req,res){
    res.render('guestmoderror');
});

app.listen(8080);