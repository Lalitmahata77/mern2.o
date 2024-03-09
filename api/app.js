const express = require("express");
const main = require("./database/index.database.js");
const Book = require("./modal/user.modal.js");
const fs = require("fs")
const mongoose = require("mongoose")
const { storage, multer} = require("./middleware/multer.middleware.js");
const path = require("path");
let maxSize = 1*1024*1024;
const upload = multer({storage, limits: {
    fileSize:maxSize
}})
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors({
    origin: '*'
}))

main()
.then(()=>{
    console.log("DB connected");
})
.catch((err) => {
    console.log("error", err);
})
app.get("/", (req, res)=>{
    res.status(200).json({
        message: "successfull"
    })
})
//create api
app.post('/book',upload.single("image"),async(req,res)=>{
   
    let filename;
    if(!req.file){
        filename = "https://st2.depositphotos.com/1000393/11789/i/450/depositphotos_117893952-stock-illustration-hacker-with-mask.jpg"
    }
    else{
        filename = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
    }
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body;
    await Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication,
        imageUrl : filename
    });

    res.json({
        "message" : "Book created successfully"
    })
})

// read all api
app.get('/book',async(req,res)=>{
     const books = await Book.find();

     res.status(200).json({
        message : "Books fetched successfully",
        data : books
     });
})

//single book fetch
app.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
             res.status(400).json({
                message: "Invalid ID provided",
            });
        }
        const book = await Book.findById(id);
        if (!book) {
             res.status(404).json({
                message: "Book not found",
            });
        }
        else {
             res.status(200).json({
                message: "Fetch single book",
                data: book
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// update specific book
app.patch('/book/:id',upload.single('image'),async(req,res)=>{
    const id = req.params.id;    // kun book update garney id ho yo
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body;
    const oldDatas = await Book.findById(id)
    let filename;
    if (req.file) {
        const oldImagePath = oldDatas.imageUrl
        const localhostUrlLength = `${req.protocol}://${req.get('host')}`.length
        const newImagePath = oldImagePath.slice(localhostUrlLength);
        //console.log(newImagePath);
        fs.unlink(`storage/${newImagePath}`,(err)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("Book updated successfully.")
            }
        })
        filename = `${req.protocol}://${req.get('host')}/${req.file.filename}`
    }
        const updateBook = await Book.findByIdAndUpdate(id,{
            bookName,
            bookPrice,
            isbnNumber,
            authorName,
            publishedAt,
            publication,
            imageUrl : filename
        });

    res.status(200).json({
        message : "Book updated successfully!",
        data : updateBook
    })

})

// delete specific book

app.delete('/book/:id',async(req,res)=>{
    const id = req.params.id;
    const oldData = await Book.findById(id);
    const imagePath = oldData.imageUrl;
    const localhostUrlLength = `${req.protocol}://${req.get('host')}`.length;
    const newImagePath = imagePath.slice(localhostUrlLength);
    fs.unlink(`storage/${newImagePath}`,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Book deleted successfully.")
        }
    })
    await Book.findByIdAndDelete(id);

    res.status(200).json({
        message : "Book Deleted Successfully!"
    })
})

app.use(express.static("./storage/"))

app.listen(3000,()=>{
    console.log("Nodejs server has started at port 3000");
})