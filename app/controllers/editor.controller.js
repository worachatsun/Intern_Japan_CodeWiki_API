const mongoose = require('mongoose')
const Editor = mongoose.model('Editor')
const Boom = require('boom')

exports.saveEditorData = (req, rep) => {
    const { editorRaw, title, tags, ownerId, ownerName } = req.payload

    if (!editorRaw || !title ) {
        return rep(Boom.notFound('Connot find raw data of editor.'))
    }
    
    const editor = new Editor({
        editorRaw,
        title,
        tags,
        owner: {
            ownerId,
            ownerName
        }
    })

    editor.save(function(err) {
        if (err) { return rep(Boom.notFound(err)) }
        return rep({editor})
    })
}

exports.getEditorDataById = (req, rep) => {
    const { _id } = req.payload

    if(!_id) { return rep(Boom.notFound('Connot find id.'))}

    Editor.findOne({ _id }, (err, editor) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({editor})
    })
}

exports.getAllEditorTopic = (req, rep) => {
    Editor.find({}, {title: true, owner: true, updatedAt: true, createdAt: true, tags: true}, (err, editor) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({editor})
    })
}

exports.updateEditorDataById = (req, rep) => {
    const { _id, editorRaw, title, tag } = req.payload

    if(!_id) { return rep(Boom.notFound('Connot find id.'))}

    Editor.findOneAndUpdate({_id}, {editorRaw, title, tag, updatedAt: new Date() }, {new: true}, (err, editor) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({editor})
    })
}

exports.addCommentById = (req, rep) => {
    const { _id, text, commentOwner } = req.payload

    const updateData = {
        text,
        commentOwner
    }

    Editor.findByIdAndUpdate(_id, {$push: {comment: updateData}}, {new: true}, (err, editor) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({editor})
    })
}

exports.searchTopicByTagAndTitle = (req, rep) => {
    const { searchText } = req.payload

    Editor.find({
        $or: [
            { title: { "$regex": searchText, "$options": "i" } },
            { tags: { $in: [searchText] } }
        ]
    }, (err, topic) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({topic})
    })
}

exports.searchMyTopic = (req, rep) => {
    const { id } = req.payload

    Editor.find({ 'owner.ownerId': id }, (err, topics) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({topics})
    })
}