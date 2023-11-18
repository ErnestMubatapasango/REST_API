console.log("Hello REST API");

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import router from "./router";

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

const MONGODB_URL = "mongodb+srv://tawanda:r3UhNAiUYUB5mh4@cluster0.0b1jsal.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL)
mongoose.connection.on("error", (error: Error) => console.log(error))

app.use('/', router())