const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Registrar datos
app.post('/api/reportes', async (req, res) => {
  try {
    const { unidad, no_ecom, usuario, destino, salida, entrada, observaciones } = req.body;
    const fecha = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD

    await pool.query(
      'INSERT INTO reportes (unidad, no_ecom, usuario, destino, salida, entrada, observaciones, fecha) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
      [unidad, no_ecom, usuario, destino, salida, entrada, observaciones, fecha]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al registrar reporte:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Obtener datos
app.get('/api/reportes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reportes ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener reportes:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Eliminar todos
app.delete('/api/reportes', async (req, res) => {
  try {
    await pool.query('DELETE FROM reportes');
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al eliminar reportes:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});
