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

app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) res.status(500).json({ message: "Failed to retrieve students" });
      else res.status(200).json(results);
  });
});

app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM students WHERE id = ?", [id], (err, results) => {
    if (err) res.status(500).json({ message: "Failed to retrieve student" });
      else if (results.length === 0) res.status(404).json({ message: "Student not found" });
      else res.status(200).json(results[0]);
  });
});

app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { Names, Sex, Address, Phone, Email } = req.body;
  db.query("UPDATE students SET Names = ?, Sex = ?, Address = ?, Phone = ?, Email = ? WHERE id = ?",
    [Names, Sex, Address, Phone, Email, id],
    err => {
      if (err) res.status(500).json({ message: "Update failed" });
        else res.status(200).json({ message: "Student updated successfully" });
    });
});


app.delete("/students/:id", (req, res) =>{
  const {id} = req.params;
  db.query("DELETE FROM students WHERE id = ?", [id], (err) =>{
    if (err) return res.status(500).send('Database error');
      res.status(200).send('Student Deleted Successfully')
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});