const express = require('express');
const router = express.Router();
const { openDb } = require('./db');
const { checkService } = require('./poller');

// Get all services with latest status
router.get('/services', async (req, res) => {
    const db = await openDb();
    const services = await db.all('SELECT * FROM services');

    // Attach latest status for each
    for (const service of services) {
        const history = await db.all(
            'SELECT latency, status FROM status_history WHERE service_id = ? ORDER BY checked_at DESC LIMIT 20',
            service.id
        );
        service.history = history.reverse(); // Newest last for graph? Or newest first? Sparklines usually left-to-right (old to new).
        // so if we get DESC (newest first), we reverse to get (oldest to newest)

        service.latest_status = history[history.length - 1]; // The last item after reverse is the newest
    }

    res.json(services);
});

// Add new service
router.post('/services', async (req, res) => {
    const { name, url, type = 'HTTP' } = req.body;
    if (!name || !url) return res.status(400).json({ error: 'Name and URL are required' });

    const db = await openDb();
    const result = await db.run(
        'INSERT INTO services (name, url, type, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
        name, url, type
    );

    const newService = await db.get('SELECT * FROM services WHERE id = ?', result.lastID);

    // Trigger an immediate check
    checkService(newService);

    res.json(newService);
});

// Get history for a service (last 24h points or similar)
router.get('/history/:id', async (req, res) => {
    const db = await openDb();
    const history = await db.all(
        'SELECT * FROM status_history WHERE service_id = ? ORDER BY checked_at DESC LIMIT 50',
        req.params.id
    );
    res.json(history.reverse());
});

// Settings (Theme)
router.get('/settings', async (req, res) => {
    const db = await openDb();
    const rows = await db.all('SELECT * FROM settings');
    const settings = {};
    rows.forEach(r => settings[r.key] = r.value);
    res.json(settings);
});

router.post('/settings', async (req, res) => {
    const db = await openDb();
    // Expects body: { theme_primary: '...', theme_bg: '...', ... }
    for (const [key, value] of Object.entries(req.body)) {
        await db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', key, value);
    }
    res.json({ success: true });
});

module.exports = router;
