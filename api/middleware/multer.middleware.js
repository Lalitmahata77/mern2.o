const multer = require("multer");
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        const allowedFiLeType = ['image/png', 'image/jpg', 'image/jpeg']
        if (!allowedFiLeType.includes(file.mimetype)) {
            cb(new Error("This file type is not supported"))
            return
        }
        cb(null, './storage')
    },
    filename : function(req, file,cb){
        cb(null, Date.now() + "_" + file.originalname)
    }
})

module.exports = {
    storage,
    multer
}
// let fileName = file.
//file size using multer file size 1mb