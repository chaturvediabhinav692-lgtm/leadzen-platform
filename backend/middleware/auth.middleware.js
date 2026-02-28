// Middleware to log requests and extract auth token
const authMiddleware = (req, res, next) => {
    // 1. Request Logging
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);

    // 2. Auth Header Extraction (Pass-through for now)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        req.userToken = token; // Attach for future use
        console.log(`Auth context: Token found`);
    } else {
        console.log(`Auth context: No token`);
    }

    next();
};

module.exports = authMiddleware;
