import express from 'express';
import z from 'zod'
const commentSchema = require('../models/commentSchema') 
const routes = express.Router();

routes.post('/createComment', async (req, res) => {
    const createComment = z.object({
        title: z.string(),
        description: z.string(),
        type: z.string(),
        createdBy: z.object({name: z.string(), id: z.string()})
    })
    const { title, description, type, createdBy } = createComment.parse(req.body)

    try{
        const commentCreated = await commentSchema.create({
            title,
            description,
            type,
            createdBy,
            createdAt: Date.now(),
            likes: [],
            comments: 0
        });
        console.log(commentCreated)
        return res.json(commentCreated);
    }catch(error){
        console.log(error)
        return res.status(400).json({error});
    }
})


module.exports = routes