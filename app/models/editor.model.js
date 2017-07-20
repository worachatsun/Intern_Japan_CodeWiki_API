const mongoose = require('mongoose')
const Schema = mongoose.Schema

let EditorSchema = new Schema({
    editorRaw: Object,
    title: {type: String, required: true},
    tags: [String],
    owner: {
        ownerId: {type: String, required: true},
        ownerName: {type: String, required: true}
    },
    comment: [{
        text: String,
        commentOwner: String
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

mongoose.model('Editor', EditorSchema)