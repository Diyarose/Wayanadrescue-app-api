const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const loginModel = require("./models/admin")


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://dhiya04:dhiyafisat@cluster0.wspdqan.mongodb.net/peopledb?retryWrites=true&w=majority&appName=Cluster0")


app.post("/adminSignup", (req, res) => {
    let input = req.body
    let hashedpassword = bcrypt.hashSync(input.password, 10)
    //console.log(hashedpassword)
    input.password = hashedpassword
    console.log(input)
    let result = new loginModel(input)
    result.save()
    res.json({ "status": "success" })
})

app.post("/adminSignin", (req, res) => {
    let input = req.body
    let result = loginModel.find({ username: input.username }).then(
        (response) => {
            if (response.length > 0) {
                const validator = bcrypt.compareSync(input.password, response[0].password)
                if (validator) {
                    jwt.sign({ email: input.username }, "rescue-app", { expiresIn: "1d" },
                        (error, token) => {
                            if (error) {
                                res.json({ "status": "Token creation failed" })
                            } else {
                                res.json({ "status": "success", "token": token })
                            }
                        })
                } else {
                    res.json({ "status": "wrong password" })
                }
            }
            else {
                res.json({ "status": "Invalid Authentication" })
            }
        }
    ).catch()
})


app.listen(8080, () => {
    console.log("Server started")
})