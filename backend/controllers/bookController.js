const mongoose = require('mongoose')
const { Book } = require("../models/bookModel")
const expressAsyncHandler = require('express-async-handler')

const objectId = mongoose.Types.ObjectId

const createBook = expressAsyncHandler(async(req, res) => {
    const {name, nickname, status, author, publisher} = req.body 
    const user = req.user;
    console.log(req.body);
    

    if (!user || !nickname || !status || !author || !publisher) return res.status(400).json({message: "All input fields required"})
        
    const book = await Book.create({name, nickname, status, user, author, publisher, user})

    if (!book) return res.status(400).json({message: "invalid input type"});

    res.json(book);
        
})

const getAllBooks = expressAsyncHandler(async(req, res) => {
    console.log("get all");
    
    const user = req.user
    const books = await Book.find({user}).sort({createdAt: -1})
    .populate("author")
    .populate("publisher")
    .lean().exec();

    if (!books) return res.sendStatus(204);

    res.status(200).json(books);
    
})

const getSingleBook = expressAsyncHandler(async(req, res) => {    
    const { id } = req.params;
    
    if(!id || !objectId.isValid(id)) return res.status(400).json({error: "invalid ID"});
    
    const book = await Book.findOne({_id: id})
    .populate("author")
    .populate("publisher")
    .exec();

    if (!book) return res.status(204).json({message: "Can't find such book"});

    res.json(book);
})


const updateBook = expressAsyncHandler(async(req, res) => {
    const { id } = req.params;
    console.log("update received", id);
    
    if(!id || !objectId.isValid(id)) return res.status(400).json({message: "invalid ID"});
        
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if(!book) return res.status(500).json({message: "Can't update book"});

    res.json({book})

})

const deleteBook = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    
    if(!id || !objectId.isValid(id)) return res.status(400).json({message: "invalid ID"});
        
    const book = await Book.findByIdAndDelete(id); 

    if(!book) return res.status(500).json({message: "Can't delete book"});
    
    res.json(book)
      
})


module.exports = {
    getAllBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook
}