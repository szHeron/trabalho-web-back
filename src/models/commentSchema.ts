import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
    title: String,
    description: String,
    type: String,
    likes: [String],
    comments: Number,
    createdAt: Date,
    author: {
        _id: String,
        name: String
    }
});

module.exports = mongoose.model('comment', commentSchema)