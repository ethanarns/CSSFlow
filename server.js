const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('db', 'root', null, {
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
// Define table
const Songs = sequelize.define('songs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    album: Sequelize.STRING,
    artist: Sequelize.STRING,
    fileUrl: Sequelize.STRING,
    imageUrl: Sequelize.STRING
});
// Save table to database
Songs.sync({force: false});

// Add a value (example)
/*Songs.create({
    name: "Feels Like I'm Dying",
    album: "Misery",
    artist: "The Amity Affliction"
});*/

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