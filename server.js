const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "habit_trackerdb",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Endpoint for user registration
app.post("/register", (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;

  // Basic input validation
  if (!first_name || !last_name || !username || !email || !password) {
    return res
      .status(400)
      .send({ success: false, message: "All fields are required" });
  }

  // Hash the password before storing it
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res
        .status(500)
        .send({ success: false, message: "Error hashing password" });
    }

    // SQL query to insert a new user with additional fields
    const query = `
      INSERT INTO users (first_name, last_name, username, email, password) 
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(
      query,
      [first_name, last_name, username, email, hashedPassword],
      (err, results) => {
        if (err) {
          // Check for unique constraint errors (e.g., duplicate username or email)
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).send({
              success: false,
              message: "Username or email already exists",
            });
          }
          return res
            .status(500)
            .send({ success: false, message: "Database error" });
        }

        // Success response
        res
          .status(201)
          .send({ success: true, message: "User registered successfully" });
      }
    );
  });
});

// Endpoint for user login
app.post("/login", (req, res) => {
  const { identifier, password } = req.body;
  const query = "SELECT * FROM users WHERE (username = ? OR email = ?)";
  db.query(query, [identifier, identifier], async (err, results) => {
    if (err) {
      res.status(500).send("Server error");
    } else if (results.length > 0) {
      const matchPassword = await bcrypt.compare(password, results[0].password);
      if (matchPassword) {
        res.status(200).send("Login successful");
      } else {
        res.status(401).send("Invalid credentials");
      }
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
});

// Endpoint to add a schedule
app.post("/add-schedule", (req, res) => {
  const { subject, schedule_type, start_time, end_time } = req.body;

  // Ensure schedule_type is stored as a comma-separated string if necessary
  const scheduleTypeString = Array.isArray(schedule_type)
    ? schedule_type.join(",")
    : schedule_type;

  const sql = `
    INSERT INTO schedules (subject, schedule_type, start_time, end_time) 
    VALUES (?, ?, ?, ?)
  `;
  db.query(
    sql,
    [subject, scheduleTypeString, start_time, end_time],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data");
      } else {
        res.status(201).send({
          id: result.insertId,
          subject,
          schedule_type: scheduleTypeString,
          start_time,
          end_time,
        });
      }
    }
  );
});

// Endpoint to fetch schedules
app.get("/schedules", (req, res) => {
  db.query("SELECT * FROM schedules", (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      res.send(results);
    }
  });
});

app.delete("/schedules/:id", (req, res) => {
  const scheduleId = req.params.id;
  db.query(
    "DELETE FROM schedules WHERE id = ?",
    [scheduleId],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error deleting schedule");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Schedule not found");
      }
      res.status(200).send("Schedule deleted successfully");
    }
  );
});

//Edit endpoint
app.put("/schedules/:id", (req, res) => {
  const scheduleId = req.params.id;
  const { subject, schedule_type, start_time, end_time } = req.body;

  const query = `
    UPDATE schedules
    SET subject = ?, schedule_type = ?, start_time = ?, end_time = ?
    WHERE id = ?`;

  db.query(
    query,
    [subject, schedule_type, start_time, end_time, scheduleId],
    (err, result) => {
      if (err) {
        console.error("Error updating schedule:", err);
        return res.status(500).send("Error updating schedule");
      }
      res.status(200).send("Schedule updated successfully");
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
