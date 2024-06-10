const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sqlite3 = require('sqlite3').verbose();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database('./solution.db', (err) => {
  if (err) {
    console.error('Database opening error: ', err);
  } else {
    console.log('Database connected');
  }
});

app.post('/solution', (req, res) => {
  const { problemId, solution } = req.body;
  const sql = 'INSERT INTO solutions (problem_id, solution) VALUES (?, ?)';

  db.run(sql, [problemId, solution], function(err) {
    if (err) {
      return res.status(500).send('Error submitting solution.');
    }
    res.status(200).send('Solution submitted successfully.');
  });
});

app.listen(PORT, () => {
  console.log(`Solution service running on port ${PORT}`);
});

