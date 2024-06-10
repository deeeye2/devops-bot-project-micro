CREATE TABLE IF NOT EXISTS issues (
  id INTEGER PRIMARY KEY,
  issue TEXT,
  category TEXT,
  user_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
