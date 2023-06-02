import express from 'express';
import z from 'zod'
const commentSchema = require('../models/commentSchema') 
const userSchema = require('../models/userSchema')
const routes = express.Router();

routes.post('/createComment', async (req, res) => {
    const createComment = z.object({
        title: z.string(),
        description: z.string(),
        type: z.string(),
        author: z.string()
    })
    const { title, description, type, author } = createComment.parse(req.body)

    try{
        const commentCreated = await commentSchema.create({
            title,
            description,
            type,
            author,
            createdAt: Date.now(),
            likes: [],
            comments: 0
        });

        return res.json(commentCreated);
    }catch(error){
        console.log(error)
        return res.status(400).json({error});
    }
})

routes.get('/', async (req, res) => {
    try{
        const comments = await commentSchema.aggregate([
            {
                $lookup: {
                from: userSchema.collection.name,
                localField: 'author',
                foreignField: '_id',
                as: 'user'
                }
            }
        ])

        return res.json(comments);
    }catch(error){
        console.log(error)
        return res.status(400).json({error});
    }
})

routes.get('/comment/:id', async (req, res) => {
    try{
        const comment = await commentSchema.findOne({_id: req.params.id})
        const user = await userSchema.findOne({_id: comment.author})
        const response = {
            _id: comment._id,
            title: comment.title,
            description: comment.description,
            author: {
                _id: user.id,
                name: user.name
            },
            likes: comment.likes,
            comments: comment.comments
        }
    
        return res.json(response);
    }catch(error){
        console.log(error)
        return res.status(400).json({error});
    }
})

routes.put('/comment/:id', async (req, res) => {
    try{
        const createComment = z.object({
            title: z.string(),
            description: z.string(),
            likes: z.array(z.string())
        })
        const { title, description, likes } = createComment.parse(req.body)
        const comment = await commentSchema.findOneAndUpdate({_id: req.params.id}, {title, description, likes})
    
        return res.json(comment);
    }catch(error){
        console.log(error)
        return res.status(400).json({error});
    }
})

module.exports = routes