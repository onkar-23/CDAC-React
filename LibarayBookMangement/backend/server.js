const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");


const app = express();
const port = 1234;


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'StartOnkar',
    database:'reactdb'
})


db.connect((err)=>{
    err == null ? console.log("Connected to database") : console.error(err.message);
})


app.get("/books",(req,res)=>{
    const sql="select * from books";
    db.query(sql,(err,result)=>{
        if (err) return res.json({message: err.message});
        else return res.json(result);
    })
})

app.post("/books",(req,res)=>{
    const sql="INSERT INTO books (title, author, published_year) VALUES(?,?,?)";
    const {title, author, pyear}=req.body;
    db.query(sql,[title, author, pyear],(err,result)=>{
        if (err) return res.json({message: "error while deleteing : "+err.message});
        else return res.json(result);
    })
})

app.put("/books/:id",(req,res)=>{
    const sql="update books set title=?, author=?, published_year=? where id =?";
    const {id}=req.params;
    const {title, author, pyear}=req.body;
    db.query(sql,[title, author, pyear,id],(err,result)=>{
        if (err) return res.json({message: "error while updating: "+err.message});
        else return res.json(result);

    })
})


app.delete("/books/:id",(req,res)=>{
    const sql="delete from books where id =?";
    const {id}=req.params;
    db.query(sql,[id],(err,result)=>{
        if (err) return res.json({message: "error while deleteing : "+err.message});
        else return res.json(result);

    })
})

app.listen(port,()=>{
    console.log("Running on port : "+port);
})