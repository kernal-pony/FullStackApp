const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");
const authRoutes = require("./routes/auth");
const verifyToken = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

// Test API
app.get("/api/test", (req, res) => {
    res.json({
        message: "API is working successfully!"
    });
});

// Database test API
app.get("/api/db-test", async (req, res) => {
    try {
        const result = await db.query("SELECT NOW()");

        res.json({
            message: "PostgreSQL connected successfully!",
            time: result.rows[0].now
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

// Authentication APIs
app.use("/api/auth", authRoutes);

// JWT Protected Dashboard API
app.get("/api/dashboard", verifyToken, async (req, res) => {
    try {
        const result = await db.query(
            "SELECT id, name, email FROM users WHERE id = $1",
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "Dashboard data fetched successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});