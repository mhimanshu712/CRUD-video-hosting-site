const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var conString= "mongodb://upgzjiozupezohnn0py3:jhINOuAepZOxNAGBBK7G@b5x4r2r6h6rmywn-mongodb.services.clever-cloud.com:27017/b5x4r2r6h6rmywn";
mongoose.connect(conString,{useNewUrlParser:true});

var junkvidcollection = "trialvid";
var junkvidlcollection = "trialvidl";
var junkvidmcollection = "trialvidm";

var junkvideocollection = "trialvideo";


var junkvideoSchema = new mongoose.Schema({title:String,link:String,story:String,likes:Number,comments:Array,share:String});
var Junkvideo = mongoose.model(junkvideocollection,junkvideoSchema);

var junkvidSchema = new mongoose.Schema({title:String,image:String,views:Number,link:String})
var Junkvid = mongoose.model(junkvidcollection,junkvidSchema);

var junkvidlSchema = new mongoose.Schema({title:String,image:String,views:Number,link:String})
var Junkvidl = mongoose.model(junkvidlcollection,junkvidSchema);

var junkvidmSchema = new mongoose.Schema({title:String,image:String,views:Number,link:String})
var Junkvidm = mongoose.model(junkvidmcollection,junkvidSchema);


app.use(express.static('public'));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
        Junkvid.find({},function(err,obja){
            if(!err){
                res.render('videolis',{vidlis:obja,vidcat:1});
            }
        });
    
});

app.get('/latest',function(req,res){
        Junkvidl.find({},function(err,obja){
            if(!err){
                res.render('videolis',{vidlis:obja,vidcat:2});
            }
        });
    
});

app.get('/mostviewed',function(req,res){
        Junkvidm.find({},function(err,obja){
            if(!err){
                res.render('videolis',{vidlis:obja,vidcat:3});
            }
        });
    
});

app.get('/video/:vidid',function(req,res){
    var vidid = req.params.vidid;
    Junkvideo.findOne({_id:vidid},function(err,obja){
        if(!err){
            res.render('video',{video:obja});
        }
    });
});

app.post('/video/:vidid/comment',function(req,res){
    var vidid = req.params.vidid;
    var nwcomment = req.body.nwcomment;
    var nwuser="Guest";
    var neuserprofile = "https://semantic-ui.com/images/avatar/small/christian.jpg";
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
    
    console.log("\nThe page name is : "+nwpage);

    if (nwvalidate=="**mayjun"){
        if (nwpage==1){
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
        }else if(nwpage==2){
            Junkvideo.create({title:nwtitle,story:nwdes,link:nwlink},function(err,obja){
                vidid=obja._id;
                console.log(obja);
                console.log("\nVid id");
                console.log(vidid);
                Junkvidl.create({title:nwtitle,image:nwthumb,views:0,link:vidid},function(err,objb){
                    if(!err){
                        console.log(objb);
                    }
                });
            });
        }else if(nwpage==3){
            Junkvideo.create({title:nwtitle,story:nwdes,link:nwlink},function(err,obja){
                vidid=obja._id;
                console.log(obja);
                console.log("\nVid id");
                console.log(vidid);
                Junkvidm.create({title:nwtitle,image:nwthumb,views:0,link:vidid},function(err,objb){
                    if(!err){
                        console.log(objb);
                    }
                });
            });
        }
    }

         res.redirect("/adminme");
	
});

app.get('/adminme',function(req,res){
	res.render('new');
});


app.listen(8080);
