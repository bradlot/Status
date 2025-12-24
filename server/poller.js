const axios = require('axios');
const { openDb } = require('./db');

async function checkService(service) {
    const db = await openDb();
    const start = Date.now();
    let status = 'DOWN';
    let latency = 0;

    try {
        await axios.get(service.url, { timeout: 5000 });
        status = 'UP';
        latency = Date.now() - start;
    } catch (error) {
        status = 'DOWN';
        latency = Date.now() - start; // Record latency even if down (timeout or error)
    }

    // Check for status change
    const lastHistory = await db.get(
        'SELECT status FROM status_history WHERE service_id = ? ORDER BY checked_at DESC LIMIT 1',
        service.id
    );

    const previousStatus = lastHistory ? lastHistory.status : 'UP';

    if (previousStatus !== status) {
        console.log(`[ALERT] Service ${service.name} went ${status}`);
        // TODO: Send Notification
    }

    // Save history
    await db.run(
        'INSERT INTO status_history (service_id, status, latency) VALUES (?, ?, ?)',
        service.id, status, latency
    );

    return { status, latency };
}

async function pollAllServices() {
    const db = await openDb();
    const services = await db.all('SELECT * FROM services');

    console.log(`Polling ${services.length} services...`);

    for (const service of services) {
        await checkService(service);
    }
}

function startPoller() {
    // Poll every 5 minutes (300000 ms)
    // For initial dev, maybe run immediately then interval
    pollAllServices();
    setInterval(pollAllServices, 300000);
}

module.exports = { startPoller, checkService };
