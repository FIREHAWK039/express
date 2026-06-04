const mongoose = require("mongoose")

async function connectToMongoDB(url) {
    //mongooose connedction
   return mongoose.connect(url)
       
}
module.exports = {
    connectToMongoDB,
} 