const mongoose = require('mongoose')

const env = require('dotenv').config()

//const db_url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
const db_url = `mongodb+srv://AritraPurkait:Aritra2003@cluster0.wz2aegp.mongodb.net/booksDB`
const dbConnect = async()=>{
    try{
        const mongoCon = await mongoose.connect(db_url)
        console.log("Mongoose connected successfully.")
    }
    catch(error){
        console.log(error)
    }
}

module.exports = dbConnect()
console.log("Database is working.")



/*
const mongoose = require('mongoose');
require('dotenv').config();

const db_url = `mongodb+srv://AritraPurkait:Aritra2003@cluster0.wz2aegp.mongodb.net/booksDB`;

const dbConnect = async () => {
    try {
        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Mongoose connected successfully.");
    } catch (error) {
        console.error("❌ Mongoose connection failed:", error);
        process.exit(1); // force stop the app
    }
};

module.exports = dbConnect;

*/
