const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const moment = require('moment');
const sscanf = require('scanf').sscanf;

const passport = require('passport');
const LocalSrtrat = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
var User =require('./models/user');

mongoose.connect('mongodb+srv://nodejs:power@cluster0-wozei.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex: true
}).then(()=>{
    console.log('connected to db');
});

app.use(require('express-session')({
    secret: "Myjunoon is the coolest",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalSrtrat(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//whatever we put in res.locals is available in all our templates.
app.use(function(req,res,next){
    res.locals.loggeduser = req.user;
    next();
});

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

function isloggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function isloggedIng(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/guestmode/r');
}

app.get('/guestmode/:q',function(req,res){
    if(req.params.q=='r'){
        Junkvid.find({},function(err,obja){
            if(!err){
                res.render('videolis',{vidlis:obja,vidcat:1,guest:1})
            }
        });
    }else if(req.params.q=='l'){
        Junkvidl.find({},function(err,obja){
            if(!err){
                res.render('videolis',{vidlis:obja,vidcat:2,guest:1});
            }
        }); 
    }else if(req.params.q=='m'){
        Junkvidm.find({},function(err,obja){
            if(!err){
                res.render('videolis',{vidlis:obja,vidcat:3,guest:1});
            }
        });
    }
});

app.get('/',isloggedIng,function(req,res){
    loggeduser = req.user;
        Junkvid.find({},function(err,obja){
            if(!err){
                res.render('videolis',{vidlis:obja,vidcat:1,guest:0});
            }
        });
});

app.get('/latest',function(req,res){
        Junkvidl.find({},function(err,obja){
            if(!err){
                res.render('videolis',{vidlis:obja,vidcat:2,guest:0});
            }
        });
    
});

app.get('/mostviewed',function(req,res){
        Junkvidm.find({},function(err,obja){
            if(!err){
                res.render('videolis',{vidlis:obja,vidcat:3,guest:0});
            }
        });
    
});

app.post('/video/:vidid/comment',isloggedIn,function(req,res){
    var vidid= req.params.vidid;
    var nwname = res.locals.loggeduser.userfullname;
    var nwimage = res.locals.loggeduser.userimage;
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

app.get('/video/:vidid', isloggedIn ,function(req,res){
    var vidid = req.params.vidid;
    Junkvideo.findOne({_id:vidid},function(err,obja){
        if(!err){
            obja.views += 1;
            res.render('video',{video:obja,videoid:vidid,guest:0});
            obja.save(function(err,objb){
                console.log("Views Updated");
            });
        }
    });
});

app.get('/videog/:vidid',function(req,res){
    var vidid = req.params.vidid;
    Junkvideo.findOne({_id:vidid},function(err,obja){
        if(!err){
            obja.views += 1;
            res.render('video',{video:obja,videoid:vidid,guest:1});
            obja.save(function(err,objb){
                console.log("Views Updated");
            });
        }
    });
});




app.get('/guestmoderror',function(req,res){
    res.render('guestmoderror');
});

app.get('/error',function(req,res){
    res.render('error',{errormessage:"Some Unknown Error Occured.",errorlink:'/'});
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


app.get('/adminme',function(req,res){
    res.render('new');
});



app.get('/register',function(req,res){
    res.render('register',{errormessage:''});
});

app.post('/register',function(req,res){
    var userfullname = req.body.userfullname;
    var username = req.body.username;
    var userpassword = req.body.userpassword;

    User.find({username:username},function(err,data){
        if(!err){
            if(!data){
                    res.render('error',{errormessage:"The user already exists.",errorlink:'/register'});
            }else{
                User.register(new User({userfullname:userfullname,username:username}),userpassword,function(err,user){
                    if(!err){
                        res.render('login',{errormessage:'Yay! Registerd, Now Login.'});
                    }
                });

            }
        }
    })

    
});

app.get('/login',function(req,res){
    res.render('login',{errormessage:''});
    
});

app.get('/login',function(req,res){
    res.render('login',{errormessage:'Wrong Credentials, Try again.'});
    
});

app.post('/login',passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect: "/loginfailed"
}),function(req,res){
});

app.get('/logout',function(req,res){
    req.logOut();
    res.redirect('/');
});

app.get('/nocontent',function(req,res){
    res.render('error',{errormessage:'There is nothing here for you, right now!'})
})


app.listen(8080);

