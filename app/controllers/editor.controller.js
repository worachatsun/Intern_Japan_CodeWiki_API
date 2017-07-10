const mongoose = require('mongoose')
const Editor = mongoose.model('Editor')
const Boom = require('boom')

exports.saveEditorData = (req, rep) => {
    const { editorRaw, title, tag, ownerId, comment } = req.payload

    if (!editorRaw || !title ) {
        return rep(Boom.notFound('Connot find raw data of editor.'))
    }
    
    const editor = new Editor({
        editorRaw,
        title,
        tag,
        ownerId,
        comment
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

exports.updateEditorDataById = (req, rep) => {
    const { _id, editorRaw, title, tag } = req.payload

    if(!_id) { return rep(Boom.notFound('Connot find id.'))}

    Editor.findOneAndUpdate({_id}, {editorRaw, title, tag}, {new: true}, (err, editor) => {
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
            { title: searchText },
            { tags: { $in: [searchText] } }
        ]
    }, (err, topic) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({topic})
    })
}