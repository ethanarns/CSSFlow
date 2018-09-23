const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('db', 'root', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    storage: './db.sqlite'
});
// Test connection
sequelize.authenticate()
    .then(() => { console.log('Connection successful.'); })
    .catch(err => { console.error('Unable to connect to the database:', err); });

const PORT = 3002;

// Access files in these solely by name
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
// Prefix with "images/"
app.use('/images', express.static(path.join(__dirname, "public/images")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function() {
    console.log("Now listening on port " + PORT);
});