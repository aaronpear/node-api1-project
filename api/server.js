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
//     try {
//       const { name, bio } = req.body;
//       console.log(req.body);
//       console.log(name, bio);
//       if (!name || !bio) {
//           res.status(400).json({ message: "Please provide name and bio for the user" });
//       }
//       const newUser = await User.insert({ name, bio });
//       console.log(newUser);
//       res.status(201).json(newUser);
//     } catch (err) {
//       res.status(500).json({ message: "There was an error while saving the user to the database" })
//     }
//   })

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
  
  


module.exports = server; // EXPORT YOUR SERVER instead of {}
