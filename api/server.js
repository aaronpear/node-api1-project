// BUILD YOUR SERVER HERE

const express = require('express');
const User = require('./users/model.js');

const server = express();

server.use(express.json());


server.post('/api/users', (req, res) => {
    console.log(req.body);
    const { name, bio } = req.body;
    console.log(name, bio);
    User.insert({ name, bio })
        .then(resp => {
            console.log(resp);
            if (!name || !bio) {
                res.status(400).json({ message: "Please provide name and bio for the user" });
            } else {
                res.status(201).json(resp);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "There was an error while saving the user to the database" });
        });
})    

server.get('/api/users', (req, res) => {
    User.find()
        .then(resp => {
            console.log(resp);
            res.json(resp);
        })
        .catch(err => {
            console.log(err);
        })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(resp => {
            console.log(resp);
            if (!resp) {
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            } else {
                res.json(resp);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "The user information could not be retrieved" });
        })
})

server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
        .then(resp => {
            if (!resp) {
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            } else {
                res.json(resp);
            }
            console.log(resp);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "The user could not be removed" });
        })
})

server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;
    User.update(req.params.id, { name, bio })
        .then(resp => {
            if (!resp) {
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            } else if (!name || !bio) {
                res.status(400).json({ message: "Please provide name and bio for the user" });
            } else {
                res.status(200).json(resp);
            }
        })
        .catch(err => {
            res.status(500).json({ message: "The user information could not be modified" });
        })
})
  
  


module.exports = server; // EXPORT YOUR SERVER instead of {}
