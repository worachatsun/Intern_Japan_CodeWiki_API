const mongoose = require('mongoose')
const Schema = mongoose.Schema

let EditorSchema = new Schema({
    editorRaw: Object
})

mongoose.model('Editor', EditorSchema)