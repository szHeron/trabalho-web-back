import express from 'express';
import z from 'zod'
const routes = express.Router();

routes.get('/login', (req, res) => {
    const createUser = z.object({
        email: z.string(),
        password: z.string()
    })
    const { email, password } = createUser.parse(req.body)
    
    return res.send('teste')
})

module.exports = routes

