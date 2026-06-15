const User = require("../models/users")



async function handelGetAllUsers(req, response) {
    const allDbUsers = await User.find({});
    return response.json(allDbUsers)
}

async function handelGetUserById(req, response) {
    const user = await User.findById(req.params.id);
    if (!user) return response.status(404).json({ error: "user not found" });
    return response.json(user);
}

async function handelUpdateUserById(req, response) {
    await User.findByIdAndUpdate(req.params.id, { last_name: "changed" });
    return response.json({ status: "success" })
}

async function handelDeleteUserById(req, response) {
    await User.findByIdAndDelete(req.params.id)
    return response.json({ status: "success" })
}

async function handelCreateNewUser(req, response) {
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
        return response.status(201).json({ message: "success", id: result._id })
    } catch (err) {
        console.error(err)
        return response.status(500).json({ message: "Error creating user", error: err.message })
    }
}

module.exports = {
    handelGetAllUsers,
    handelGetUserById,
    handelUpdateUserById,
    handelDeleteUserById,
    handelCreateNewUser
}   