const mongoose = require("mongoose")

const nameSchema = new mongoose.Schema({
    cmdType: { type: "String", required: true },
    userID: { type: "String", required: true },
    cmdName: { type: "String", required: true },
    timestamp: { type: "Number", required: true }
})

const model = mongoose.model('Cooldown', nameSchema)
module.exports = model