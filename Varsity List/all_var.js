const express = require("express");
const app = express();
app.use(express.static(__dirname));
const port = 80;
//html
const fs = require('fs')
const filecontent = fs.readFileSync('proj1.html')
const page2=fs.readFileSync('engi_var.html')
 
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
    res.status(200).end(filecontent);
});

app.get("/Home", (req, res)=>{ 
    res.status(200).end(filecontent);
});

app.get("/GovtVersity", (req, res)=>{
    let str_fi=new Object();
    
    con.query('select UniversityName from hello.all_var_from_wiki where Type="Public"', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        const params={'va':results,'title':'Public'};
        res.status(200).render('engi_var.pug',params);
    });
    

});

app.get("/PrvVersity", (req, res)=>{
    let str_fi=new Object();
    con.query('select UniversityName from hello.all_var_from_wiki where Type="Private"', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        const params={'va':results,'title':'Private'};
        res.status(200).render('engi_var.pug',params);
    });

});

app.get("/EngineeringVarsity", (req, res)=>{
    let str_fi=new Object();
    con.query('select * from hello.all_var_from_wiki where Specialization Like "%Engineering%"', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        const params={'va':results,'title':'Engineering'};
        res.status(200).render('engi_var.pug',params);
    });

});

app.get("/AgriculturalVarsity", (req, res)=>{
    let str_fi=new Object();
    con.query('select UniversityName from hello.all_var_from_wiki where Specialization Like "%Agricultural%"', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        const params={'va':results,'title':'Agricultural'};
        res.status(200).render('engi_var.pug',params);
    });

});
app.get("/Medical", (req, res)=>{
    let str_fi=new Object();
    con.query('select UniversityName from hello.all_var_from_wiki where Specialization Like "%Medical%"', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        const params={'va':results,'title':'Medical'};
        res.status(200).render('engi_var.pug',params);
    });

});
app.get("/GeneralVarsity", (req, res)=>{
    let str_fi=new Object();
    con.query('select UniversityName from hello.all_var_from_wiki where Specialization Like "%General%"', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        const params={'va':results,'title':'General'};
        res.status(200).render('engi_var.pug',params);
    });

});
app.get("/Science&TechnologyVarsity", (req, res)=>{
    let str_fi=new Object();
    con.query('select UniversityName from hello.all_var_from_wiki where Specialization Like "%Technology%"', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        const params={'va':results,'title':'Science & Technology'};
        res.status(200).render('engi_var.pug',params);
    });

});


app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
