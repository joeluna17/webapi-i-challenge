// implement your API here
const express = require('express');
const server = express();
const cors = require('cors')
const db = require('./data/db.js');
server.use(express.json()); // Parses all data to jason from a request response
server.use(cors()); 


server.get('/', (req,res)=>{
    res.send("Your Server is running")
})

// GET All DATA
server.get('/api/users', (req, res) =>{
    db.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({success: false, err})
    })
})

//GET USER BY ID
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params
    db.findById(id)

    .then(user => {
        if(user){
            res.status(200).json({success:true, user})
        }else{
            res.status(404).json({sucess: false, message:"Not Found"})
        }
    })
    .catch(err => {
        res.status(500).json({success: false, message:`The user with the specified ID does not exist. ${err}`})
    })
})

//POST / ADD A USER 
server.post('/api/users', (req, res) => {
    const newUser = req.body
    if(newUser.name === "" || newUser.bio === ""){
       res.status(400).json({success: false, errorMessage:"Please provide a name and bio for the user."})        
    }else{
        db.insert(newUser)
        .then(user => {
            res.status(201).json({success:true, user})
        })
        .catch(err => {
            res.status(500).json({success: false, error: "There was an error while saving the user to the database", err })
        })
    }
})

//PUT / UPDATE A USER
server.put('/api/users/:id', (req, res)=> {
    const {id} = req.params
    const userUpdate = req.body

    if(userUpdate.name === "" || userUpdate.bio === ""){
        res.status(400).json({success:false,  errorMessage: "Please provide name and bio for the user." })
    }else{
        db.update(id, userUpdate)
        .then(updatedUser => {
            if(updatedUser){
                res.status(200).json({success: true, updatedUser})
            }else{
               res.status(404).json({success:false, message: "The user with the specified ID does not exist."}) 
            }
        })
        .catch(err => {
            res.status(500).json({success:false, error: "The user information could not be modified."})
        })
    }
})

//DELETE A USER 
server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params
    db.remove(id)
    .then(deletedUser => {
        if(deletedUser){
            res.status(204).end()
        }else{
            res.status(404).json({success:false, message:"The user with the specified ID does not exsist."})
        }
    })
    .catch(err => {
        res.status(500).json({success: false, error: "The user could not be removed"})
    })
})



















server.listen(5000,()=>{
    console.log("server listening on port: 5000")
})