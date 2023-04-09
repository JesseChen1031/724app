const express = require('express');
const dotenv = require('dotenv');
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

app.listen(5000, ()=> {
    console.log("server started on port 5000")
})
