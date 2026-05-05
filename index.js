const express = require('express')

const app = express();
const port = 8080;
app.use(express.json())

app.get("/", (req,res)=> {
    res.send("This is the homepage")
})

const users = [
    {id:1, name: "Alice", email:"alice@example.com" },
    {id: 2 , name: "Ade", email:"ade@example.com" },
]

//get all user
app.get("/users", (req, res)=> {
  res.status(200).json(users);
})

//get a Single user
app.get("/users/:id", (req,res)=> {
    const id = parseInt(req.params.id)
    const user = users.find(el => el.id === id)

  
    if (!user) {
        return  res.status(404).json({
            error:"User not found"
        });
    }
      res.status(200).json(user);
})

app.post("/new-users", (req, res)=> {
    const {name, email} = req.body;

    //validating input
    if(!name || !email){
        req.status(400).json({
            error: "Name and email are required"
        })
    }

    //create new user

    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
    }

    users.push(newUser);

    // 201 = resource created successfully
    res.status(201).json(newUser);

});

app.listen(port,()=>{
    console.log("server is up and running")
})