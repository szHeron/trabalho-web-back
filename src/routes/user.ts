import express from 'express';
import z from 'zod'
const userSchema = require('../models/userSchema') 
const routes = express.Router();

routes.get('/login', async (req, res) => {
    const createUser = z.object({
        email: z.string().email(),
        password: z.string()
    })
    const { email, password } = createUser.parse(req.body)

    try{
        const user = await userSchema.findOne({email: email, password: password}).exec()
        if(!user)
            return res.json({"error": "Email ou senha invalidos"});
        return res.json(user);
    }catch(error){
        return res.status(400).json({error});
    }
})

routes.post('/register', async (req, res) => {
    const createUser = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    })
    const { name, email, password } = createUser.parse(req.body)
    try{
        const userCreated = await userSchema.create({
            name,
            email,
            password
        });

        return res.json(userCreated);
    }catch(error){
        return res.status(400).json({error});
    }
})

module.exports = routes

