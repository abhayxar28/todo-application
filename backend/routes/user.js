const express = require('express');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const {authenticateJWT} = require('../auth/index');
const {SECRET} = require('../config');
const {User} = require('../db/index');
const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email().min(1, "Email is required"),
    password: zod.string().min(6, "Password must be at least 6 characters long")
})

router.post('/signup', async(req, res)=>{
    try{
        const parsed = signupBody.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({ errors: parsed.error.errors });
        }

        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(user){
            return res.json({message: 'User already exist'});
        }else{
            const newUser = new User({username, password});
            await newUser.save();
            const token = jwt.sign({_id: newUser._id, username}, SECRET, {expiresIn: '1hr'});
            res.json({message: 'User Created', token});
        }
    }catch(error){
        console.error('Error registering user', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
})

const logininBody = zod.object({
    username: zod.string().email().min(1, "Email is required"),
    password: zod.string().min(6, "Password must be at least 6 characters long")
})

router.post('/login', async(req, res)=>{
    try{
        const parsed = logininBody.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({ errors: parsed.error.errors });
        }
        const {username, password} = req.body;
        const user = await User.findOne({username, password});
        if(user){
            const token = jwt.sign({_id: user._id, username}, SECRET, {expiresIn:'1hr'});
            res.json({token});
        }else{
            return res.status(403);
        }
    }catch(error){
        console.error('Error registering user', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
})

router.get('/me', authenticateJWT, async(req, res)=>{
    const user = await User.findOne({username: req.user.username});
    if(user){
        return res.json({username: user.username});
    }else{
        return res.status(402).json({message: "Admin doesn't exist"})
    }
})

module.exports = router;