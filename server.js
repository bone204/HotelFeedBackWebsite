const express = require('express');
const app = express();
const port = 4000;
const path = require('path');

const sql = require('msnodesqlv8');
const connectionString = "server=.;Database=QLKS_LAOPERA;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const kh = "SELECT * FROM DANHGIA";

sql.query(connectionString, kh, (err, rows) => {
    console.log(rows);
})

app.use(express.json());

app.get("/", (req,res) => {
    res.sendFile("index.html", {root: __dirname});
})

app.post("/contact", (req, res) => {
    // Lấy dữ liệu từ req.body gửi từ frontend
    const { rating, email, comment } = req.body;

    const insertQuery = `
        INSERT INTO DANHGIA (SAO, EMAIL, NOIDUNG, NGAYTAOFEEDBACK)
        VALUES (?, ?, ?, GETDATE())
    `;

    // Mảng các tham số cho câu truy vấn SQL
    const params = [rating, email, comment];

    // Thực thi truy vấn SQL
    sql.query(connectionString, insertQuery, params, (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).send("Error inserting data into database");
        } else {
            console.log("Data inserted successfully");
            res.status(200).send("Data inserted successfully");
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});