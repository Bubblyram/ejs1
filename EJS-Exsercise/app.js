var express=require('express');
var app=express();
var bodyParser=require('body-parser');


var connection=require('./model/database');

app.set("views","./views")
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({exteded:false}));
app.use(express.static(__dirname));

app.use('/login',function(req,res){
    console.log('hi');
    res.render('login');
})

app.post('/displaymarks',function(req,res){
    var name=req.body.name;
    var rollno=req.body.rollno;
    var dateofexam=req.body.dateofexam;
    connection.query('select name from ejs_details where name like ?',[name],(err,results)=>{
        if (err) throw err;
        if(results){
            connection.query('select dateofexam from ejs_details where name like ? and dateofexam like ?',[name,dateofexam],(err,result)=>{
                    connection.query(' select ejs1.*,ejs_details.rollno from ejs1 join ejs_details on ejs1.name=ejs_details.name and ejs_details.dateofexam=ejs1.dateofexam where ejs_details.name like ? and ejs_details.dateofexam like ?',[name,dateofexam],(err,data)=>{
                        if (err) throw err;
                        if(data)
                        {
                            res.render("marks",{userdata:data});
                            console.log(data);
                        }
                    })
            })
        }
    })
})

app.listen(1000,()=>{
    console.log("Server is running at the port 1000");
})