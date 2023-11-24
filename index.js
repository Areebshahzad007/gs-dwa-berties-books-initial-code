// Import the required modules
var mysql = require('mysql');
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');

// Define the database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'appuser',
    password: 'app2027',
    database: 'myBookshop'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to the database');
});

// Make the database connection available globally
global.db = db;

// Create the Express application object
const app = express();
const port = 8000;

// Use the body-parser middleware for parsing incoming POST request data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up static files (CSS) to be served from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Set the directory where Express will look for views (HTML files)
app.set('views', __dirname + '/views');

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Configure EJS to process HTML files using its rendering engine
app.engine('html', ejs.renderFile);

// Define the data for the shop
var shopData = { shopName: "Bertie's Books" };

// Require the main.js file inside the routes folder, passing in the Express app and shopData as arguments.
// All the routes will be defined in this file.
require('./routes/main')(app, shopData);

// Start the web app listening on the specified port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
