require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "sebelas_db",
  port: process.env.DB_PORT || 3306,
});

// Koneksi Database

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database berhasil terhubung");
  }
});

// READ

app.get("/articles", (req, res) => {
  const sql = "SELECT * FROM articles ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

// CREATE

app.post("/articles", (req, res) => {
  const { title, content, image } = req.body;

  db.query(
    "INSERT INTO articles(title, content, image) VALUES (?, ?, ?)",
    [title, content, image],
    (err, result) => {
      if (err) throw err;

      res.json({
        message: "Artikel berhasil ditambahkan",
      });
    },
  );
});

// DELETE

app.delete("/articles/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM articles WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.json({
      message: "Artikel berhasil dihapus",
    });
  });
});

// UPDATE

app.put("/articles/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  const sql = "UPDATE articles SET title=?, content=?, image=? WHERE id=?";

  db.query(sql, [title, content, image, id], (err, result) => {
    if (err) throw err;

    res.json({
      message: "Artikel berhasil diupdate",
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
