const mongoose = require("mongoose")
const databaseURL = "mongodb+srv://lm3654725:123@cluster0.zhfiirb.mongodb.net/?retryWrites=true&w=majority";

async function main(){
    await mongoose.connect(databaseURL)

}
module.exports = main