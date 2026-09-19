const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));


// Health API
app.get("/api/health", (req, res) => {

    res.json({
        status: "UP",
        message: "Employee Management API is running"
    });

});


// Get employees
app.get("/api/employees", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM employees ORDER BY id"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Database error"
        });

    }

});


// Add employee
app.post("/api/employees", async (req, res) => {

    try {

        const {
            name,
            email,
            department
        } = req.body;

        if (!name || !email || !department) {

            return res.status(400).json({
                error: "All fields are required"
            });

        }

        const result = await pool.query(
            `INSERT INTO employees
             (name, email, department)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, email, department]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to create employee"
        });

    }

});


// Delete employee
app.delete("/api/employees/:id", async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM employees WHERE id = $1",
            [id]
        );

        res.json({
            message: "Employee deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to delete employee"
        });

    }

});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Server running on port ${PORT}`
    );

});