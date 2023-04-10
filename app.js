const express = require('express');
const dotenv = require('dotenv');
const request = require('request');
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


const rqliteAddr = "localhost:4001/db/execute?pretty&timings"

app.post("/auth/register", (req, res) => {    
    const { username, name, age, password } = req.body

    // db.query() code goes here
})

app.post("/auth/login", (req, res) => {  
    const { username, password} = req.body

    // db.query() code goes here
})