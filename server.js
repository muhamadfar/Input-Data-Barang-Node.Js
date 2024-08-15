const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'barang_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

app.post('/api/barang', (req, res) => {
    const { nama_barang, jumlah, harga } = req.body;
    const query = 'INSERT INTO barang (nama_barang, jumlah, harga) VALUES (?, ?, ?)';

    db.query(query, [nama_barang, jumlah, harga], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Data barang berhasil ditambahkan', id: result.insertId });
    });
});

app.get('/api/barang', (req, res) => {
    const query = 'SELECT * FROM barang';

    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/api/barang/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM barang WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Data barang berhasil dihapus' });
    });
});

app.put('/api/barang/:id', (req, res) => {
    const { id } = req.params;
    const { nama_barang, jumlah, harga } = req.body;
    const query = 'UPDATE barang SET nama_barang = ?, jumlah = ?, harga = ? WHERE id = ?';

    db.query(query, [nama_barang, jumlah, harga, id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Data barang berhasil diperbarui' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});