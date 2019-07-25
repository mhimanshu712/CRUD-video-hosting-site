const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const moment = require('moment');
const sscanf = require('scanf').sscanf;

var conString= "mongodb://upgzjiozupezohnn0py3:jhINOuAepZOxNAGBBK7G@b5x4r2r6h6rmywn-mongodb.services.clever-cloud.com:27017/b5x4r2r6h6rmywn";
mongoose.connect(conString,{useNewUrlParser:true});

var junkvidcollection = "ttrialvid";
var junkvidlcollection = "ttrialvidl";
var junkvidmcollection = "ttrialvidm";

var junkvideocollection = "ttrialvideo";

var commentSchema = new mongoose.Schema({name:String,time:{type:Date,default:Date.now},content:String,image:String});
var Comment = mongoose.model("comment",commentSchema);


var junkvideoSchema = new mongoose.Schema({title:String,link:String,story:String,likes:Number,comments:[commentSchema],share:String});
var Junkvideo = mongoose.model(junkvideocollection,junkvideoSchema);

var junkvidSchema = new mongoose.Schema({title:String,image:String,views:{type:Number,default:0},link:String})
var Junkvid = mongoose.model(junkvidcollection,junkvidSchema);

var junkvidlSchema = new mongoose.Schema({title:String,image:String,views:{type:Number,default:0},link:String})
var Junkvidl = mongoose.model(junkvidlcollection,junkvidSchema);

var junkvidmSchema = new mongoose.Schema({title:String,image:String,views:{type:Number,default:0},link:String})
var Junkvidm = mongoose.model(junkvidmcollection,junkvidSchema);

var randataSchema = new mongoose.Schema({name:String,value:String});
var Randata = mongoose.model("randata",randataSchema);


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

app.post('/video/:vidid/comment',function(req,res){
    var vidid= req.params.vidid;
    var nwname = "Guest";
    var nwimage = "https://semantic-ui.com/images/avatar/small/christian.jpg";
    var nwcontent = req.body.content;


    Junkvideo.findById(vidid,function(err,postz){
        if(!err){
            console.log(postz);
            postz.comments.push({name:nwname,content:nwcontent,image:nwimage});
            postz.save(function(err,postzz){
                if(!err){
                    res.redirect('/video/'+vidid);
                    console.log(postzz);
                }
            });
        }
        
    });

  

});

app.get('/video/:vidid',function(req,res){
    var vidid = req.params.vidid;
    Junkvideo.findOne({_id:vidid},function(err,obja){
        if(!err){
            obja.views += 1;
            res.render('video',{video:obja,videoid:vidid});
            obja.save(function(err,objb){
                console.log("Views Updated");
            });
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
    var nwvalidate = req.body.nwvalidate;
    var nwpage = req.body.nwpage;
    var vidid;

    nwlink = sscanf(nwlink,"https://youtu.be/%s");
    var nwembedlink = "https://youtube.com/embed/" + nwlink;
    var nwthumb = "http://img.youtube.com/vi/" + nwlink + "/maxresdefault.jpg";
    
    console.log("\nThe page name is : "+nwpage);

    if (nwvalidate=="**mayjun"){
        if (nwpage==1){
            Junkvideo.create({title:nwtitle,story:nwdes,link:nwembedlink},function(err,obja){
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
            Junkvideo.create({title:nwtitle,story:nwdes,link:nwembedlink},function(err,obja){
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
            Junkvideo.create({title:nwtitle,story:nwdes,link:nwembedlink},function(err,obja){
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
        Randata.findOneAndUpdate({name:"lastVideo"},{name:"lastvideo",value:vidid},function(err,obja){
            console.log('\nPrinting last videodata\n');
            console.log(obja);
        });

    }

         res.redirect("/adminme");
	
});

app.get('/login',function(req,res){
    res.render('login')

});

app.get('/register',function(req,res){
    res.render('register');
});


app.get('/adminme',function(req,res){
	res.render('new');
});


app.listen(8080);

