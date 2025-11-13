//setp 1 : import 

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
//---------------------------------------------------------------------------

// step 2 : use part for app 
const app = express();
const port = 12345;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
//---------------------------------------------------------------------------------
// step 3 : create connection

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"reactdb"

})


db.connect((err)=>{
    err == null ? console.log("connected") : console.error(err.message);
})
//------------------------------------------------------------------------------------------------------

//setp 5 : api defenition

app.get("/get-customers",(req,res)=>{
    const sql = "select * from customers";
    db.query(sql,(err,result)=>{
        if (err) return res.status(500).json({message: err.message});
        else return res.status(200).json(result);
    })
})

app.post("/add-customers",(req,res)=>{
    const sql = "insert into customers (Name, Product,amount) values (?,?,?)";
    const{Name,Product,amount}= req.body;
    db.query(sql,[Name,Product,amount],(err,result)=>{
        if (err) return res.status(500).json({message: err.message});
        else return res.status(200).json({id:result.insertId,Name,Product,amount});
    })
})

app.put("/update-customers/:id",(req,res)=>{
    const sql = "update customers set Name= ?, Product = ?, amount = ? where id = ?";
    const{id}=req.params;
    const{Name,Product,amount}=req.body;
    db.query(sql,[Name,Product,amount,id],(err,result)=>{
        if (err) return res.status(500).json({message: err.message});
        else return res.status(200).json({message: "updated successfully"});
    })
})


app.delete("/delete-customers/:id",(req,res)=>{
    const sql = "delete from customers where id =?";
    const{id}=req.params;
    db.query(sql,[id],(err,result)=>{
        if (err) return res.status(500).json({message: err.message});
        else return res.status(200).json({message: "deleted successfully"});
    })
})


//--------------------------------------------------------------------------------------------------------
//setp 4 : listen to port 


app.listen(port,()=>{
    console.log("Running on port : "+port);
})
