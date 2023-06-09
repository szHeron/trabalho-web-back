import express from 'express';
import z from 'zod'
const commentSchema = require('../models/commentSchema') 
const imageUpload = require('../utils/imageUpload')
const multer = require('multer');
const routes = express.Router();
const upload = multer();

routes.post('/uploadImage', upload.single('file'), imageUpload.ImageUpload);

routes.post('/createComment', async (req, res) => {
    const createComment = z.object({
        title: z.string(),
        description: z.string(),
        type: z.string(),
        author: z.object({
            _id: z.string(),
            name: z.string()
        }),
        photo: z.string().nullable()
    })
    const { title, description, type, author, photo } = createComment.parse(req.body)

    try{
        const commentCreated = await commentSchema.create({
            title,
            description,
            type,
            author,
            photo: photo?photo:"",
            createdAt: Date.now(),
            likes: [],
            comments: [],
        });

        return res.json(commentCreated);
    }catch(error){
        console.log(error)
        return res.status(400).json({error});
    }
})

routes.get('/', async (req, res) => {
    try{
        const comments = await commentSchema.find()

        return res.json(comments);
    }catch(error){
        console.log(error)
        return res.status(400).json({error});
    }
})

routes.get('/comment/:id', async (req, res) => {
    try{
        const comment = await commentSchema.findOne({_id: req.params.id})
    
        return res.json(comment);
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
            likes: z.array(z.string()),
            type: z.string(),
            comments: z.array(z.object({
                author_name: z.string(),
                comment: z.string()
            }))
        })
        const { title, description, likes, type, comments } = createComment.parse(req.body)
        const comment = await commentSchema.findOneAndUpdate({_id: req.params.id}, {title, description, likes, type, comments})
        return res.json(comment);
    }catch(error){
        console.log(error)
        return res.status(400).json({error});
    }
})

routes.delete('/comment/:id', async (req, res) => {
    try{
        const comment = await commentSchema.deleteOne({_id: req.params.id})
    
        return res.json(comment);
    }catch(error){
        console.log(error)
        return res.status(400).json({error});
    }
})

module.exports = routes