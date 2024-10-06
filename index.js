const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// Home route to serve HTML file
app.get('/home', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Home</title>
        </head>
        <body>
            <h1>Welcome to ExpressJs Tutorial</h1>
        </body>
        </html>
    `);
});

// Profile route to return user data
app.get('/profile', (req, res) => {
    fs.readFile('./user.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Server error' });
        res.json(JSON.parse(data));
    });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    fs.readFile('./user.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Server error' });
        const user = JSON.parse(data);

        if (user.username !== username) {
            return res.json({ status: false, message: 'User Name is invalid' });
        }

        if (user.password !== password) {
            return res.json({ status: false, message: 'Password is invalid' });
        }

        res.json({ status: true, message: 'User Is valid' });
    });
});

// Logout route
app.get('/logout/:username', (req, res) => {
    const { username } = req.params;
    res.send(`<b>${username} successfully logged out.</b>`);
  });

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send('Server Error');
});

// Start the server
app.listen(process.env.port || 8081, () => {
    console.log('Server is running on port', process.env.port || 8081);
});