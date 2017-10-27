const mongoose = require('mongoose')
const AppMaker = mongoose.model('AppMaker')
const Boom = require('boom')
const shell = require('shelljs')

exports.saveAppInfo = (req, rep) => {
    const { uni_name, uni_abb, uni_th_name, uni_th_abb, color, logo, createdBy } = req.payload
    const { career, donate, event, news } = req.payload.features
    // if (!editorRaw || !title ) {
    //     return rep(Boom.notFound('Connot find raw data of editor.'))
    // }

    const { stdout, stderr, code } = shell.exec(`bash ${__dirname+'/../../gen-android.sh'}`,{silent:true, async:false})
    const stdoutArr = stdout.split('\n')
    
    const appMaker = new AppMaker({
        uni_name,
        uni_abb,
        uni_th_name,
        uni_th_abb,
        color,
        logo,
        createdBy,
        features: {
            career,
            donate,
            event,
            news
        },
        android_download: stdoutArr[stdoutArr.length-2]
    })

    appMaker.save(function(err) {
        if (err) { return rep(Boom.notFound(err)) }
        return rep({appMaker})
    })
}

exports.searchAppByUserId = (req, rep) => {
    const { createdBy } = req.payload

    AppMaker.find({ createdBy }, (err, apps) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({apps})
    })
}

exports.downloadAndroid = (req, rep) => {
    return rep.file(`${__dirname}/../android_app/${req.params.id}.apk`, {filename: `${req.params.id}.apk`, mode: 'attachment', lookupCompressed: true})
}

exports.updateAppData = (req, rep) => {
    const { uni_name, uni_abb, uni_th_abb, uni_th_name, features, color, logo, _id } = req.payload

    const updateData = {
        uni_name, 
        uni_abb, 
        uni_th_abb, 
        uni_th_name, 
        features, 
        color, 
        logo
    }

    AppMaker.findByIdAndUpdate(_id, updateData, {new: true}, (err, app) => {
        if(err) { return rep(Boom.notFound(err)) }
        const {createdBy} = app

        AppMaker.find({ createdBy }, (err, apps) => {
            if(err) { return rep(Boom.notFound(err)) }
            return rep({apps})
        })
    })
}

exports.deleteApp = (req, rep) => {
    AppMaker.remove({ _id: req.payload._id }, function (err) {
        if (err) return handleError(err)
        return rep({status: 'removed'})
    })
}

exports.searchAppById = (req, rep) => {
    AppMaker.find({ _id: req.params.id }, (err, apps) => {
        if(err) { return rep(Boom.notFound(err)) }
        return rep({apps})
    })
}