import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const mongoString = process.env.DATABASE_URL

if(mongoString){
    mongoose.connect(mongoString)
    const database = mongoose.connection

    database.on('error', (error) => {
        console.log(error)
    })
    
    database.once('connected', () => {
        console.log('Database Connected');
    })

    module.exports = database
}