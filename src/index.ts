console.log("Hello REST API");

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import compression from "compression";
import cors from "cors";

const app = express(); //application initialization

app.use(cors({
    credentials: true, //our app is going to use cors and its going to help with authentication
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

//server listener
server.listen(8080, () => {
    console.log('server listening on http://localhost:8080');
})
