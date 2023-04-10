const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const app = express();

dotenv.config({ path: './.env'})

app.set('view engine', 'hbs')

// other imports
const path = require("path")

const publicDir = path.join(__dirname, './public')

app.use(express.static(publicDir))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.listen(5000, ()=> {
    console.log("server started on port 5000")
})

app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())


const rqliteAddr = "http://localhost:4001/db/execute?pretty&timings"

app.post("/auth/register", (req, res) => {    
    const { username, name, age, password } = req.body

    const queryData = {
        query: "SELECT * FROM users Where username = ?",
        parameters: [username]
    };

    axios.post(rqliteAddr, queryData)
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    const insertData = {
        query: "INSERT INTO users (username, name, age, password) VALUES (?, ?, ?, ?)",
        parameters: [username, name, age, password]
    };

    axios.post(rqliteAddr, insertData)
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
})

app.post("/auth/login", (req, res) => {  
    const { username, password} = req.body

    const queryData = {
        query: "SELECT * FROM users Where username = ?",
        parameters: [username]
    };

    axios.post(rqliteAddr, queryData)
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // db.query() code goes here
})