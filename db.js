const { MongoClient } = require('mongodb')
let  dbConnection

module.exports = {
    connectToDB:(cb)=>{
        MongoClient.connect("mongodb://0.0.0.0:27017/Users")
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