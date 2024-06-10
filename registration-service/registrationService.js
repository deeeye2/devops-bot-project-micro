const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require('dotenv');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database('./registration.db', (err) => {
  if (err) {
    console.error('Database opening error: ', err);
  } else {
    console.log('Database connected');
  }
});

const sendVerificationEmail = (email, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Account Verification Code',
    text: `Your verification code is: ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

app.post('/register', (req, res) => {
  const { username, password, name, surname, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const code = crypto.randomBytes(3).toString('hex');

  db.run(`INSERT INTO users (username, password, name, surname, email) VALUES (?, ?, ?, ?, ?)`, [username, hashedPassword, name, surname, email], function(err) {
    if (err) {
      return res.status(500).send('Error during registration. Please try again.');
    }

    db.run(`INSERT INTO verification_codes (email, code) VALUES (?, ?)`, [email, code], function(err) {
      if (err) {
        return res.status(500).send('Error saving verification code. Please try again.');
      }

      sendVerificationEmail(email, code);
      res.send('Registration successful! Please check your email for verification code.');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Registration service running on port ${PORT}`);
});

