import { Request, Response } from 'express';
const cloudinary = require('../config/cloudinaryConfig')
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

module.exports = {
    async ImageUpload(req: Request, res: Response) {
        try {
            if(req.file){
                const file64 = parser.format('image', req.file.buffer);
                const result = await cloudinary.uploader.upload(file64.content!, {
                    upload_preset: 'igb3yyhn',
                });
                console.log(result)
                return res.status(200).json(result);
            }
            return res.status(500);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao fazer upload da imagem.' });
        }
    },
}