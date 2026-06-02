const express = require("express");

const app = express()

const mongoose = require("mongoose")

const userRouter = require("./routes/users")



const port = 8000
//mobile ke liye taki  jason data na jaye

const fs = require("fs")


//mongooose connedction
mongoose
    .connect("mongodb://127.0.0.1:27017/youtube-app-1")
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.log("error connecting", err))




app.use(express.urlencoded({ extended: false }))

app.use((req, response, next) => {
    fs.appendFile("log.txt", `\n${req.method} ${req.url} ${new Date()}`, (err, data) => {
        next()
    })
})










app.use("/users", userRouter)

app.listen(port, () => console.log("servver bhag raha hai"))