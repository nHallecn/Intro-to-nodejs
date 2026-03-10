import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});

import connectDB from './config/db.js';
import app from './app.js';



const startServer = async () => {
    try{
        await connectDB();

        app.on('error', (error) => {
            console.log('ERROR', error);
            throw error;
        });
        app.listen(process.env.PORT || 8000, () =>{
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        })
    } catch (error) {
        console.error('Error starting server:', error);
    }
}
console.log("ENV TEST:", process.env.MONGODB_URI);

startServer();