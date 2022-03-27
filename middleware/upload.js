const multer = require('multer')
const moment = require('moment')
//Basic konfiguration - weg wohin gespreichert werden, und prüfungen der files

//wie wird der file hochgeladen
const storage = multer.diskStorage({
    //wohin unsere file gespeichert werden
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    // wir übergeben einen name unsrem file
    filename(req, file, cb){
        //wir erstellen den filename, um die gleichen filenamen zu vermeiden
        const date = moment().format('DD.MM.YYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

//überprüfen fileformat
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }else {
        cb(null, false)
    }
}
const limits = {
    fileSize: 1024 * 1024 * 5
}

//export nach draussen, wo wir unsere konfigurationen übergeben
module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
    //oder so schreiben {storage, fileFilter, limits}, weil namen gleich sind
})