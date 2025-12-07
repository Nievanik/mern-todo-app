const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const Todo = require('./models/Todo.js');
const app = express();
const cors = require('cors');

const todoRoutes = require('./routes/todoRoutes.js');

//Middlewares
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(cors({
  origin: 'http://localhost:5173' //  Vite frontend URL
}));



//Routes
app.get('/test', (req, res) => {
  console.log(req.body);
  res.send('hello world');
})

//To create new todo
app.use("/todo", todoRoutes)




//Database Connections
const MONGODB_URL = process.env.MONGODB_URL
main().then(()=>{
  console.log("Database connected success");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGODB_URL);
}

//Server Start
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server Listening on ${port}`);
})
