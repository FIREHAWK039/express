const express = require("express");

const app = express()

const fs = require("fs")

const userRouter = require("./routes/users")

const port = 8000



const connectToMongoDB = require("./connections").connectToMongoDB
const { logReqRes } = require("./middleware")

async function startDB() {
  try {
    await connectToMongoDB("mongodb://127.0.0.1:27017/youtube-app-1")
    console.log("MongoDB connected")
  } catch (err) {
    console.error("MongoDB connection error:", err)
  }
}

startDB()

//  middlewares -plugins
app.use(express.urlencoded({ extended: false }))
app.use(logReqRes("log.txt"))


//  Routes
app.use("/users", userRouter)

app.listen(port, () => console.log("servver bhag raha hai 8000 pe"))