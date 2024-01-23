require('dotenv').config()
const { MongoClient } = require('mongodb')
let  dbConnection

module.exports = {
    connectToDB:(cb)=>{
        MongoClient.connect(process.env.URI)
        // MongoClient.connect(process.env.localURI)
        .then(client =>{
            dbConnection = client.db()
            return cb()
        }) 
        .catch(err=>{
            console.log(err);
            return cb(err)
        })
    },
    getDB:() => dbConnection
}