const express = require("express");
const app = express();
app.use(express.static(__dirname));
const port = 80;
//html
const fs = require('fs')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//mysql
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1305",
  database: "hello"
});
con.connect();

//pug
app.set('view engine', 'pug');
app.set('views', './views')



app.get("/", (req, res)=>{ 
    res.status(200).render('homepage_main.pug');
});

app.get("/Home", (req, res)=>{ 
    res.status(200).render('homepage_main.pug');
});

app.get("/Public", (req, res)=>{
    let str_fi=new Object();
    
    con.query('select * from hello.all_var_from_wiki where Type="Public"', function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
        const params={'va':results,'title':'Public'};
        res.status(200).render('engi_var.pug',params);
    });
    

});

app.get("/Private", (req, res)=>{
    let str_fi=new Object();
    con.query('select * from hello.all_var_from_wiki where Type="Private"', function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
        const params={'va':results,'title':'Private'};
        res.status(200).render('engi_var.pug',params);
    });

});

app.get("/Engineering", (req, res)=>{
    let str_fi=new Object();
    con.query('select * from hello.all_var_from_wiki where Specialization Like "%Engineering%"', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        const params={'va':results,'title':'Engineering'};
        res.status(200).render('engi_var.pug',params);
    });

});

app.get("/Agricultural", (req, res)=>{
    let str_fi=new Object();
    con.query('select * from hello.all_var_from_wiki where Specialization Like "%Agricultural%"', function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
        const params={'va':results,'title':'Agricultural'};
        res.status(200).render('engi_var.pug',params);
    });

});
app.get("/Medical", (req, res)=>{
    let str_fi=new Object();
    con.query('select * from hello.all_var_from_wiki where Specialization Like "%Medical%"', function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
        const params={'va':results,'title':'Medical'};
        res.status(200).render('engi_var.pug',params);
    });

});
app.get("/General", (req, res)=>{
    //console.log(req.body)
    let str_fi=new Object();
    con.query('select * from hello.all_var_from_wiki where Specialization Like "%General%"', function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
        const params={'va':results,'title':'General'};
        res.status(200).render('engi_var.pug',params);
    });

});

app.get("/Science&Technology", (req, res)=>{
    let str_fi=new Object();
    console.log(req.body);
    con.query('select * from hello.all_var_from_wiki where Specialization Like "%Technology%"', function (error, results, fields) {
        if (error) throw error;
        //console.log(results);
        const params={'va':results,'title':'Science & Technology'};
        res.status(200).render('engi_var.pug',params);
    });

});
app.post("/More",(req,res)=>{
    console.log(req.body.name);
    nick=req.body.name.toString();
    query_str="select * from hello.all_var_from_wiki where Nickname = '"+nick+"'"
    con.query(query_str, function (error, results, fields) {
        if (error) throw error;
        console.log(results[0])
        const params={'va':results[0]};
        res.status(200).render('individul_var.pug',params);
        
    });
});


app.listen(port,'127.0.0.1', ()=>{
    console.log(`The application started successfully on port ${port}`);
});
