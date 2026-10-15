const express = require('express');
const app = express();
const port = 3000; 
const mysql = require('mysql2');

app.use(express.json());


const db= mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'l4swdb'
});

db.connect(err =>{
if (err) throw err;
console.log("connected to database");
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// add students
app.post("/students", (req, res) => {
  const { Names, Sex, Address, Phone, Email } = req.body;
  db.query("INSERT INTO students (Names, Sex, Address, Phone, Email) VALUES (?,?,?,?,?)",
    [Names, Sex, Address, Phone, Email],
    err => {
      if (err) res.status(500).json({ message: "Insert failed" });
        else res.status(201).json({ message: "Student added successfully" });
    });      
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});