const Todo = require("../models/Todo.js") 


module.exports.newTodo = async (req,res)=>{
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description
  })
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);  
  } catch (err) {
    console.log(err);
    res.status(400).json({message: err.message});

  }

} 

module.exports.getAllTodos= async (req,res)=>{
  try {
    const todos = await Todo.find();
    res.status(201).json(todos);  
  } catch (err) {
    console.log(err);
    res.status(400).json({message: err.message});

  }
} 

module.exports.getTodo= async (req,res)=>{
  const {id} = req.params;
  try {
    const todo = await Todo.findById(id);
    if(!todo) {res.status(404).json({'message':'Todo not found'})}
    res.status(201).json(todo);  
  } catch (err) {
    console.log(err);
    res.status(400).json({message: err.message});

  }
} 
module.exports.updateTodo= async (req,res)=>{
  const {id} = req.params;
  const updatedTodo = {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false
  }
  try {
    const todo = await Todo.findByIdAndUpdate(id, updatedTodo);
    if(!todo) {res.status(404).json({'message':'Todo not found'})}
    res.status(201).json(todo);  
  } catch (err) {
    console.log(err);
    res.status(400).json({message: err.message});
  }
} 
module.exports.deleteTodo= async (req,res)=>{
  const {id} = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if(!todo) {res.status(404).json({'message':'Todo not found'})}
    res.status(201).json({message:"Todo deleted succeefully"});  
  } catch (err) {
    console.log(err);
    res.status(400).json({message: err.message});
  }
} 