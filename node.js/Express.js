const http = require('http');     //importing http module // http module is used to create a server and handle HTTP requests and responses. It provides functionalities for building web applications and APIs.

const express = require('express');

const app = express();  

app.get("/", (req, response) => {
    return response.end("HomePage");
})
app.get("/about", (req, response) => {
   return response.send("helo " + req.query.name);
})

app.listen(8000,() => console.log("server started"))