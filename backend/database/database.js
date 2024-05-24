//database.js

const mongoose = require("mongoose");
const url = "mongodb+srv://droneProject:dronePassword@droneproject.twzxyqy.mongodb.net/";
const dbName = "data";

const connectDB = async () =>{
    try{
        await mongoose.connect(url, {dbName: dbName});

    }catch (error){
        console.error('Database error: ', error);
    }
};

module.exports = connectDB;
