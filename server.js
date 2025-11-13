const express=require("express");
const mysql = require("mysql2");
const cors = require("cors");


const app = express();
const port = 1234;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'reactdb'
})

db.connect((err)=>{
    err == null ? console.log("Connected") : console.log(err.message);
})


app.get("/student",(req,res)=>{
    const sql= "select * from Students";
    db.query(sql,(err,result)=>{
        if (err) return res.status(500).json({message : err.message});
        else return res.json(result);
    })
})

app.post("/student",(req,res)=>{
    const sql= "INSERT INTO Students (FName, LName, DOB, Email) VALUES (?,?,?,?)";
   const {FName, LName, DOB, Email}= req.body;
    db.query(sql,[FName, LName, DOB, Email],(err,result)=>{
        if (err) return res.status(500).json({message : err.message});
        else return res.json(result);
    })
})
app.put("/student/:id", (req, res) => {
  const sql = "UPDATE Students SET FName=?, LName=?, DOB=?, Email=? WHERE id=?";
  const { id } = req.params;
  const { FName, LName, DOB, Email } = req.body;
  db.query(sql, [FName, LName, DOB, Email, id], (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ message: err.message });
    } else {
      return res.json({ message: "Updated successfully" });
    }
  });
});


app.delete("/student/:id",(req,res)=>{
    const sql= "delete from Students where id =?";
    const {id}= req.params;
    db.query(sql,[id],(err,result)=>{
        if (err) return res.status(500).json({message : err.message});
        else return res.json({message : "deleted "});
    })
})



app.listen(port,()=>{
    console.log("Running on port : "+port);
})

