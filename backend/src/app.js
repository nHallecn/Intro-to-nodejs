<<<<<<< HEAD
import express from "express";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});
=======
import express from 'express';


const app = express(); // Create an Express application
>>>>>>> b7785cd1b691b95f8c258e5604028ee49a0a95f9

export default app;