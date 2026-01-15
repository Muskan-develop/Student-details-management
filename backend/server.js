const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const path = require('path');

// Middleware
app.use(express.static(path.join(__dirname, '../')));
app.use(express.json());
app.use(cors());

// Server Port
const port = 3000;

// ✅ Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'student_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});


// ==================== LOGIN ====================
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM students WHERE username = ? AND password = ?';

  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  });
});


// ==================== STUDENT ROUTES ====================

// ✅ Add new student
app.post('/add-student', (req, res) => {
  const { name, roll_no, department, email } = req.body;
  const sql = "INSERT INTO student_details (name, roll_no, department, email) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, roll_no, department, email], (err, result) => {
    if (err) {
      console.error('Error adding student:', err);
      return res.status(500).json({ success: false, error: err });
    }
    res.json({ success: true, message: "Student added successfully!" });
  });
});

// ✅ Get all students
app.get('/students', (req, res) => {
  const sql = "SELECT * FROM student_details";
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching students:', err);
      return res.status(500).json({ success: false, error: err });
    }
    res.json(result);
  });
});

// ✅ Delete a student
app.delete("/delete-student/:id", (req, res) => {
  const studentId = req.params.id;
  const sql = "DELETE FROM student_details WHERE id = ?";
  db.query(sql, [studentId], (err, result) => {
    if (err) {
      console.error("Error deleting student:", err);
      res.status(500).json({ message: "Error deleting student" });
    } else {
      res.json({ message: "Student deleted successfully" });
    }
  });
});

// ✅ Update a student
app.put("/update-student/:id", (req, res) => {
  const { name, roll_no, department, email } = req.body;
  const studentId = req.params.id;
  const sql = "UPDATE student_details SET name=?, roll_no=?, department=?, email=? WHERE id=?";
  db.query(sql, [name, roll_no, department, email, studentId], (err, result) => {
    if (err) {
      console.error("Error updating student:", err);
      res.status(500).json({ message: "Error updating student" });
    } else {
      res.json({ message: "Student updated successfully" });
    }
  });
});


// ==================== TEACHER ROUTES ====================
app.post("/add-teacher", (req, res) => {
  const { tname, education, course } = req.body;
  const sql = "INSERT INTO teacher (tname, education, course) VALUES (?, ?, ?)";
  db.query(sql, [tname, education, course], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

app.get("/teachers", (req, res) => {
  db.query("SELECT * FROM teacher", (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

app.delete("/delete-teacher/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM teacher WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});



// ==================== COURSE ROUTES ====================
app.post("/add-course", (req, res) => {
  const { cname, fees, duration } = req.body;
  const sql = "INSERT INTO course (cname, fees, duration) VALUES (?, ?, ?)";
  db.query(sql, [cname, fees, duration], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});

app.get("/courses", (req, res) => {
  db.query("SELECT * FROM course", (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

// Delete course
app.delete("/delete-course/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM course WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true });
  });
});
