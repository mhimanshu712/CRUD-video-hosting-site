const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var conString= "mongodb://upgzjiozupezohnn0py3:jhINOuAepZOxNAGBBK7G@b5x4r2r6h6rmywn-mongodb.services.clever-cloud.com:27017/b5x4r2r6h6rmywn";
mongoose.connect(conString,{useNewUrlParser:true});

var junkvidcollection = "trialvid";
var junkvideocollection = "trialvideo";


var junkvideoSchema = new mongoose.Schema({title:String,link:String,story:String,likes:Number,comments:Array,share:String});
var Junkvideo = mongoose.model(junkvideocollection,junkvideoSchema);

//function usedb(a,callback){
        //junkvidcollection = junkvidcollection + a;

        junkvidSchema = new mongoose.Schema({title:String,image:String,views:Number,link:String})
        Junkvid = mongoose.model(junkvidcollection,junkvidSchema);
        //callback();
//}


app.use(express.static('public'));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    //function todo(){
        Junkvid.find({},function(err,obja){
            if(!err){
                res.render('videolis',{vidlis:obja,vidcat:1});
            }
        });
    //}
    //usedb("1",todo);
    
});

app.get('/latest',function(req,res){
    //function todo(){
        Junkvid.find({},function(err,obja){
            if(!err){
                res.render('videolis',{vidlis:obja,vidcat:2});
            }
        });

    //}
    //usedb("2",todo);
    
});

app.get('/mostviewed',function(req,res){
    //function todo(){
        Junkvid.find({},function(err,obja){
            if(!err){
                res.render('videolis',{vidlis:obja,vidcat:3});
            }
        });

    //}
    //usedb("3",todo);
    
});

app.get('/video/:vidid',function(req,res){
    var vidid = req.params.vidid;
    Junkvideo.findOne({_id:vidid},function(err,obja){
        if(!err){
            res.render('video',{video:obja});
        }
    });
});

app.get('/guestmoderror',function(req,res){
    res.render('guestmoderror');
});

app.post('/newentry',function(req,res){
	var nwtitle=req.body.nwtitle;
	var nwdes = req.body.nwdes;
	var nwlink = req.body.nwlink;
    var nwthumb = req.body.nwthumb;
    var nwvalidate = req.body.nwvalidate;
    var nwpage = req.body.nwpage;
    var vidid;
    
    //usedb("1");
    console.log("\nThe page name is : "+nwpage);

    //if(nwvalidate=="mayjun"){
        Junkvideo.create({title:nwtitle,story:nwdes,link:nwlink},function(err,obja){
            vidid=obja._id;
            console.log(obja);
            console.log("\nVid id");
            console.log(vidid);
            Junkvid.create({title:nwtitle,image:nwthumb,views:0,link:vidid},function(err,objb){
                if(!err){
                    console.log(objb);
                }
            });
        });

   // }
         console.log("\nVid id now:");
         console.log(vidid);

         res.redirect("/adminme");
	

});

app.get('/adminme',function(req,res){
	res.render('new');
});


app.listen(8080);
