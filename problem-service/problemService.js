const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sqlite3 = require('sqlite3').verbose();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database('./problem.db', (err) => {
  if (err) {
    console.error('Database opening error: ', err);
  } else {
    console.log('Database connected');
  }
});

app.post('/problem', (req, res) => {
  const { userId, problem } = req.body;
  const sql = 'INSERT INTO problems (user_id, problem) VALUES (?, ?)';

  db.run(sql, [userId, problem], function(err) {
    if (err) {
      return res.status(500).send('Error submitting problem.');
    }
    res.status(200).send('Problem submitted successfully.');
  });
});

app.listen(PORT, () => {
  console.log(`Problem service running on port ${PORT}`);
});

