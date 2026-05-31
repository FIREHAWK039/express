const express = require("express");

const users = require("./MOCK_DATA.json")

const app= express()

const port = 8000
//mobile ke liye taki  jason data na jaye

const fs = require("fs")

app.use(express.urlencoded({extended: false }))

app.use((req, response, next)=>{
    fs.appendFile("log.txt", `\n${req.method} ${req.url} ${new Date()}`, (err, data)=>{
    next()})
})   
   


app.get("/users",(req, response)=>{
    const html = users.map((user)=>{
        return `<ul>${user.first_name} ${user.last_name}</ul>`
    }).join("")
    response.send(html)
    }
)
app.get("/api/users", (req, response)=>{
    return response.json(users) 
})


//yhan se rest api cahlu h
app
.route("/api/users/:id")
.get((req, response)=>{
const id = Number(req.params.id)
const user =users.find(user => user.id ===id)
return response.json(user)
})
.patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    // Find the user index
    const userIndex = users.findIndex((user) => user.id === id);

    // If user not found
    if (userIndex === -1) {
      return res.json({ status: "error", message: "User not found" });
    }

    // Update only the fields sent in body (partial update)
    users[userIndex] = { ...users[userIndex], ...body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success", updatedUser: users[userIndex] });
    });
    })

.delete((req, response)=>{
        //delete your user
        return response.json({status: "pending"})
})


app.post("/api/users", (req, response)=>{
        const body = req.body
        users.push({...body, id: users.length + 1})
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            return response.json({status: "success", id: users.length})
        })
        
})



 
app.listen(port,()=> console.log("servver bhag raha hai"))