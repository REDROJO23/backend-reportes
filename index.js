const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Registrar datos
app.post('/api/reportes', async (req, res) => {
  const { unidad, no_ecom, usuario, destino, salida, entrada, observaciones, fecha } = req.body;
  await pool.query(
    'INSERT INTO reportes (unidad, no_ecom, usuario, destino, salida, entrada, observaciones, fecha) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
    [unidad, no_ecom, usuario, destino, salida, entrada, observaciones, fecha]
  );
  res.sendStatus(200);
});

// Obtener datos
app.get('/api/reportes', async (req, res) => {
  const result = await pool.query('SELECT * FROM reportes ORDER BY id DESC');
  res.json(result.rows);
});

// Eliminar todos
app.delete('/api/reportes', async (req, res) => {
  await pool.query('DELETE FROM reportes');
  res.sendStatus(200);
});

app.listen(3001, () => console.log('Servidor backend en puerto 3001'));