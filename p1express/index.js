const express = require("express");

const users = require("./MOCK_DATA.json")

const app= express()

const port = 8000
//mobile ke liye taki  jason data na jaye

const fs = require("fs")

app.use(express.urlencoded({extended: false }))

app.get("/users",(req, response)=>{
    const html = users.map((user)=>{
        return `<ul>${user.first_name} ${user.last_name}</ul>`
    }).join("")
    response.send(html)
    }
)

//yhan se rest api cahlu h
app
.route("/api/users/:id")
.get((req, response)=>{
const id = Number(req.params.id)
const user =users.find(user => user.id ===id)
return response.json(user)
})
.patch((req, response)=>{
        //edit your user
        return response.json({status: "pending"})
})
.delete((req, response)=>{
        //delete your user
        return response.json({status: "pending"})
})


app
.route("/api/users")

.post((req, response)=>{
        const body = req.body
        users.push({...body, id: users.length + 1})
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            return response.json({status: "success", id: users.length})
        })
        
})
 
app.listen(port,()=> console.log("servver bhag raha hai"))