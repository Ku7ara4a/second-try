require('dotenv').config()

const express = require('express')
const {compileETag} = require("express/lib/utils");
const req = require("express/lib/request");
const app = express()
const port = process.env.PORT

app.use(express.json())

let users = []
const averageUser = {
    id : 0 ,
    name : "" ,
    email : "" ,
    password : "",
}
app.post('/user/create', (req, res) => {
    if (users.find(user => user.name == req.body.name)){
        res.status(400).json('User name already exists')
    }
    else if(users.find(user => user.email == req.body.email)){
        res.status(400).json('Email is already taken')
    }
    else {
        let user = Object.create(averageUser)
        user.id = users.length + 1
        user.name = req.body.name
        user.email = req.body.email
        user.password = req.body.password
        users.push(user)
        res.status(200).json('User created successfully')
    }
})

let search
function checkID(req, res, next){
    if (users.find(user => user.id === req.body.id)){
        search = users.find(user => user.id === req.body.id)
        next()
    } else {
        res.status(400).json('User not exists')
    }
}
app.get('/user/id', checkID , (req, res) => {
    console.log("ok")
    res.status(200).json(search)
})
app.get('/user/all', (req, res) => {
    res.status(200).json(users)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})