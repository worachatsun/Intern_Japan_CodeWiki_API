const mongoose = require('mongoose')
const Editor = mongoose.model('Editor')
const Boom = require('boom')

exports.saveEditorData = (req, rep) => {
    const { editorRaw } = req.payload

    if (!editorRaw ) {
        return rep(Boom.notFound('Connot find raw data of editor.'))
    }
    
    const editor = new Editor({
        editorRaw
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
    const { _id, editorRaw } = req.payload

    if(!_id) { return rep(Boom.notFound('Connot find id.'))}

    Editor.findOneAndUpdate({_id}, {editorRaw}, (err, editor) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({editor})
    })
}
