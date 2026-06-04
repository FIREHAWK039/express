const express = require("express");

const app = express()

const fs = require("fs")

const userRouter = require("./routes/users")

const port = 8000

const { connectToMongoDB } = require("./connections")
const { logReqRes } = require("./middleware")

connectToMongoDB("mongodb://127.0.0.1:27017/youtube-app-1")







app.use(express.urlencoded({ extended: false }))

app.use(logReqRes("log.txt"))







app.use("/users", userRouter)

app.listen(port, () => console.log("servver bhag raha hai"))