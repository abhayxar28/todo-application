const express = require('express');
const {Todo} = require('../db/index');
const {authenticateJWT} = require('../auth/index');
const router = express.Router();
const zod = require('zod');

const todoBody = zod.object({
    title: zod.string().min(1, 'Enter the title'),
    description: zod.string()
})

router.post('/todo', authenticateJWT, async(req, res)=>{
    try{
        const response = todoBody.safeParse(req.body);
        if(!response.success){
            return res.status(400).json({ errors: response.error.errors });
        }
        const {title, description} = req.body;
        const todo = await Todo.create({title, description, userId: req.user._id});
        res.json({todo});
    }catch(error){
        console.error('Error registering user', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
})          

router.get('/todo', authenticateJWT, async(req, res)=>{
    try{
        const userId = req.user._id;
        const todo = await Todo.find({userId: userId});
        res.json({todo});
    }catch(error){
        console.error('Error registering user', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
})

router.get('/todo/:todoId', authenticateJWT, async(req, res)=>{
    try{
        const todoId = req.params.todoId;
        const todo = await Todo.findById(todoId);
        res.json({todo});
    }catch(error){
        console.error('Error registering user', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
})

router.patch('/todo/:todoId', authenticateJWT, async(req, res)=>{
    try{
        const todoId = req.params.todoId;
        const newTodo = req.body;
        const todo = await Todo.findByIdAndUpdate(todoId, {$set: newTodo });
        res.json({todo});
    }catch(error){
        console.error('Error registering user', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
})

router.delete('/todo/:todoId', authenticateJWT, async(req, res)=>{
    const todoId = req.params.todoId;
    const todo = await Todo.findByIdAndDelete(todoId);
    res.json({message: 'todo deleted', todo});
})


module.exports = router;