// initialising dependecies
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
// const { log } = require('console');
const cors = require('cors');




app.use(express.json());
app.use(cors());
dotenv.config();


// CREATE DATABASE CONNCETION

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });




// < YOUR code goes down here 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Data is a file found in the Views folder 

app.get('/data', (req, res) => {

    // Retrieve data from database 
    db.query('SELECT * FROM patients', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error Retrieving data')
        } else {
            //Display the records to the browser 
            res.render('data', { results: results });
        }
    });
});



// check if the db connection works

db.connect((err) => {
    //connection not working
    if (err) return console.log('Error connectimg to Mysql database');



    //connection successful

    console.log('connected to Mysql server successfully as id:', db.threadId)
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);


        // SEND MESSAGE TO THE BROWSER

        console.log(' Sending message to the browser...');
        app.get('/', (req, res) => {
            res.send('Server started successfully, MySQL has run successfully! We can go ON!')

        })
    });
});






