const express = require("express");

const app = express()

const mongoose = require("mongoose")


const port = 8000
//mobile ke liye taki  jason data na jaye

const fs = require("fs")


//mongooose connedction
mongoose
    .connect("mongodb://127.0.0.1:27017/youtube-app-1")
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.log("error connecting", err))

//schema 
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    job_title: {
        type: String,
    },
    gender: {
        type: String,
        required: true
    }

})

const User = mongoose.model("user", userSchema)

app.use(express.urlencoded({ extended: false }))

app.use((req, response, next) => {
    fs.appendFile("log.txt", `\n${req.method} ${req.url} ${new Date()}`, (err, data) => {
        next()
    })
})



app.get("/users", async (req, response) => {
    const allDbUsers = await User.find({});
    const html = 
         `<ul>  
         ${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
         </ul>`
    response.send(html)
})


app.get("/api/users", async (req, response) => {
    const allDbUsers = await User.find({});
    return response.json(allDbUsers)
})


//yhan se rest api cahlu h
app
    .route("/api/users/:id")
    .get(async (req, response) => {
        
        const user = await User.findById(req.params.id);
        if (!user) return response.status(404).json({error: "user not found"});
        return response.json(user);
    })


    .patch(async (req, response) => {
        await User.findByIdAndUpdate(req.params.id, {last_name: "changed"});
        return response.json({ status: "success" })
    })

   
    


app.post("/api/users", async (req, response) => {
    const body = req.body;
    if (!body || 
        !body.first_name || 
        !body.last_name || 
        !body.email || 
        !body.gender || 
        !body.job_title
    ) {
        return response.status(400).json({ message: "Please provide all required fields" })
    }

    try {
        const result = await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            gender: body.gender,
            job_title: body.job_title,
        })
        console.log("result", result)
        return response.status(201).json({ message: "success" })
    } catch (err) {
        console.error(err)
        return response.status(500).json({ message: "Error creating user", error: err.message })
    }
})








app.listen(port, () => console.log("servver bhag raha hai"))