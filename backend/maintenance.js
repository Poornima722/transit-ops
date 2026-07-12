const express = require('express');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid'); // If your team uses standard UUID generation

const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 1. CREATE MAINTENANCE LOG
router.post('/api/maintenance', async (req, res) => {
  const { vehicle_id, description, cost } = req.body;

  if (!vehicle_id || !description || cost === undefined) {
    return res.status(400).json({
      error: 'vehicle_id, description, and cost are required',
    });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Generate a fresh text-based UUID for the primary key
    const newLogId = uuidv4();

    // Fixed to match schema: maintenance_logs, status='ACTIVE', uses created_at implicitly
    const inserted = await client.query(
      `INSERT INTO maintenance_logs (id, vehicle_id, description, cost, status, created_at)
       VALUES ($1, $2, $3, $4, 'ACTIVE', NOW())
       RETURNING id, vehicle_id, description, cost, status, created_at`,
      [newLogId, vehicle_id, description, cost]
    );

    // Update the vehicle profile to 'In Shop'
    await client.query(
      `UPDATE vehicles
       SET status = 'In Shop'
       WHERE id = $1`,
      [vehicle_id]
    );

    await client.query('COMMIT');

    return res.status(201).json({
      message: 'Maintenance log created successfully',
      maintenance: inserted.rows[0],
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating maintenance log:', error);

    return res.status(500).json({
      error: 'Failed to create maintenance log',
      details: error.message,
    });
  } finally {
    client.release();
  }
});

// 2. CLOSE MAINTENANCE LOG
router.put('/api/maintenance/:id/close', async (req, res) => {
  const { id } = req.params;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Fetch the linked vehicle using the text/UUID id match
    const logResult = await client.query(
      `SELECT vehicle_id FROM maintenance_logs WHERE id = $1`,
      [id]
    );

    if (logResult.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Maintenance log not found' });
    }

    const vehicleId = logResult.rows[0].vehicle_id;

    // Fixed to match schema: Updates status to 'CLOSED' and populates closed_at timestamp
    await client.query(
      `UPDATE maintenance_logs
       SET status = 'CLOSED', closed_at = NOW()
       WHERE id = $1`,
      [id]
    );

    // Restore vehicle back to Available status
    await client.query(
      `UPDATE vehicles
       SET status = 'Available'
       WHERE id = $1`,
      [vehicleId]
    );

    await client.query('COMMIT');

    return res.status(200).json({
      message: 'Maintenance log closed successfully',
      maintenanceId: id,
      vehicleId,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error closing maintenance log:', error);

    return res.status(500).json({
      error: 'Failed to close maintenance log',
      details: error.message,
    });
  } finally {
    client.release();
  }
});

module.exports = router;