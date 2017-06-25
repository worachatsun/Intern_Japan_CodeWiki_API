exports.render = (req, rep) => {
    rep({ name: req.params.name })
}

exports.saveEditorData = (req, rep) => {
    console.log(req.payload.data)
    rep(req.payload)
}