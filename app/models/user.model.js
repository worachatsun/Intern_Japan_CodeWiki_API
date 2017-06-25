const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
    username: { type: String, unique: true, index: true },
    password: String
})

mongoose.model('User', UserSchema)