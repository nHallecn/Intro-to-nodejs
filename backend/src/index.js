// 1. Import and config dotenv first using this syntax to handle ESM hoisting
import 'dotenv/config'; 
import connectDB from './config/db.js';
import app from './app.js';
import dns from 'node:dns/promises';


dns.setServers(['8.8.8.8', '1.1.1.1']);

const startServer = async () => {
    try {
        // 2. Wait for the DB connection
        await connectDB();

        app.on('error', (error) => {
            console.error('EXPRESS ERROR:', error);
            throw error;
        });

        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server startup failed:', error);
        process.exit(1);
    }
};

startServer();