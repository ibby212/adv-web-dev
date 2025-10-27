const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let users = [
    {
        "id": 1,
        "name": "John Doe",
        "age": 28,
        "role": "Software Engineer",
        "avatar_url": "https://images.unsplash.com/photo-1760981253092-5d1a9f04eef6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=90&w=800&h=800&fit=crop&crop=face"
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "age": 32,
        "role": "Product Manager",
        "avatar_url": "https://images.unsplash.com/photo-1761405378292-30f64ad6f60b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=90&w=800&h=800&fit=crop&crop=face"
    },
    {
        "id": 3,
        "name": "Mike Johnson",
        "age": 25,
        "role": "UX Designer",
        "avatar_url": "https://images.unsplash.com/photo-1586167040688-bf77a826b687?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=90&w=800&h=800&fit=crop&crop=face"
    },
    {
        "id": 4,
        "name": "Sarah Wilson",
        "age": 30,
        "role": "Data Scientist",
        "avatar_url": "https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=90&w=800&h=800&fit=crop&crop=face"
    },
    {
        "id": 5,
        "name": "David Brown",
        "age": 35,
        "role": "DevOps Engineer",
        "avatar_url": "https://images.unsplash.com/photo-1635753789289-4fccda80121c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=90&w=800&h=800&fit=crop&crop=face"
    },
    {
        "id": 6,
        "name": "Emily Davis",
        "age": 27,
        "role": "Frontend Developer",
        "avatar_url": "https://images.unsplash.com/photo-1667382137349-0f5cb5818a7c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=90&w=800&h=800&fit=crop&crop=face"
    }
];

app.get('/users', (req, res) => {
    res.json({
        success: true,
        data: users,
        message: "Users fetched successfully"
    });
});

app.put('/users', (req, res) => {
    try {
        const { data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                success: false,
                message: "Invalid data format. Expected array of users."
            });
        }
        
        users = data;
        
        res.json({
            success: true,
            data: users,
            message: "Users updated successfully"
        });
    } catch (error) {
        console.error('Error updating users:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: "API is running",
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "User Management API",
        version: "1.0.0",
        endpoints: {
            "GET /users": "Fetch all users",
            "PUT /users": "Update users",
            "GET /health": "Health check"
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
