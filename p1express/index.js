const express = require("express");

const users = require("./MOCK_DATA.json")

const app= express()

const port = 8000
//mobile ke liye taki  jason data na jaye

app.get("/users",(req, response)=>{
    const html = users.map((user)=>{
        return `<ul>${user.first_name} ${user.last_name}</ul>`
    }).join("")
    response.send(html)
    }
)

//yhan se rest api cahlu h
app.get("/api/users", (req, response)=>{
return response.json(users)
})

app.get("/api/users/:id", (req, response)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=> user.id === id)
    return response.json(user)
})

app.listen(port,()=> console.log("servver bhag raha hai"))