const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authMiddleware = require('./middleware/auth.middleware');
const leadsRoutes = require('./routes/leads.routes');
const ticketsRoutes = require('./routes/tickets.routes');

const app = express();
const PORT = process.env.PORT || 8000;

// 1. Core Middleware
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// 2. Routes
app.use('/api/v1/leads', leadsRoutes);
app.use('/api/v1/tickets', ticketsRoutes);

// 3. 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        data: null,
        error: "Route not found"
    });
});

// 4. Global Error Handler
app.use((err, req, res, next) => {
    console.error(`[INTERNAL ERROR] ${err.stack}`);
    res.status(500).json({
        success: false,
        data: null,
        error: "Internal server error"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API base URL: http://localhost:${PORT}/api/v1`);
});
