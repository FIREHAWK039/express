const express = require("express")
const User = require("../models/users")

const { handelGetAllUsers,
    handelGetUserById,
    handelUpdateUserById,
    handelDeleteUserById,
    handelCreateNewUser} = require("../controllers/users")

const router = express.Router()

router.route("/",).get(handelGetAllUsers).post(handelCreateNewUser)

//yhan se rest api cahlu h
router
    .route("/:id")
    .get(handelGetUserById)
    .patch(handelUpdateUserById)
    .delete(handelDeleteUserById)



module.exports = router;