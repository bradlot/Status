const express = require('express');
const cors = require('cors');
const { initDb } = require('./db');
const { startPoller } = require('./poller');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

async function start() {
    await initDb();
    startPoller();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

start();
