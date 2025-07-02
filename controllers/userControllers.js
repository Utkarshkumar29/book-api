const User=require('../models/userSchema')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const { readJSON, writeJSON } = require('../utils/fileService')
const path = require('path')
const usersPath = path.join(__dirname, '../models/users.json')

const RegisterUser=async(req,res)=>{
    const {email,password}=req.body
    try {
        const users = await readJSON(usersPath)
        const existingUser = users.find(user => user.email === email)
        if(existingUser){
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashPassword=await bcrypt.hash(password,10)
        const newUser=new User({
            id: Date.now().toString(),
            email,
            password:hashPassword
        })
        users.push(newUser);
        await writeJSON(usersPath, users)
        const token = jwt.sign({ userId: newUser.id, email: newUser.email },process.env.JWT_SECRET,{ expiresIn: '1h' })

        return res.status(201).json({ message: 'User registered successfully',token })
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Server error' })
    }
}

const LoginUser=async(req,res)=>{
    const {email,password}=req.body
    try {
        const users = await readJSON(usersPath)
        const user = users.find(user => user.email === email)
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign({  userId: user.id, email: user.email },process.env.JWT_SECRET,{ expiresIn: '1h' })
        return res.status(200).json({ message: 'Login successful', token })
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports={RegisterUser,LoginUser}