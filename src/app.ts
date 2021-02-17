require("dotenv").config();
// const express = require( "express" );
import express from "express";
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = <any>process.env.PORT|5000;
require("./db/conn");

app.use(cors())

const routes = require("./routers/routes");
app.use(routes);



app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );