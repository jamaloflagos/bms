const mongoose = require('mongoose')
const { Book } = require("../models/bookModel")
const { BookCategory } = require('../models/bookCategoryModel')

const objectId = mongoose.Types.ObjectId

const getAllBookController = async(req, res) => {
    console.log("all book"); 
    
    const user = req.user
    
    try {
        const book = await Book.find({user}).sort({createdAt: -1})
        .populate("author")
        .populate("category")
        .populate("publisher")
        .lean().exec();
        res.status(200).json(book)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getSingleBookController = async(req, res) => {
    console.log("single book gotten");
    
    const { id } = req.params
    console.log(id)
    if(!objectId.isValid(id)) {
        return res.status(400).json({error: "invalid ID"})
    }
    
    try {
        const book = await Book.findOne({_id: id})
        .populate("author")
        .populate("category")
        .populate("publisher")
        .exec();
        res.json(book)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
    
    console.log("get single book request");
     
}

const saveBookController = async(req, res) => {
    const {book_name, nickname, status} = req.body 
    try {
        const user = req.user;
        const author = req.author_id;
        const publisher = req.publisher_id;
        const category = req.category_id;
        console.log(user);
        
        const books = await Book.create({name: book_name, nickname, status, user, author, publisher, category})
        const book_id = books._id;
        const bookCategory = await BookCategory.create({book_id, category});
        res.status(201).json(books);
        console.log(books);
        console.log(bookCategory);
        
    } catch (error) { 
        res.status(400).json({message: "All inputs required"});
        console.log(error);
    }

    console.log("save request recieved");
    
}

const editBookController = async(req, res) => {
    const { id } = req.params
    if(!objectId.isValid(id)) {
        return res.status(400).json({message: "invalid ID"})
    }

    try {
        const book = await Book.findByIdAndUpdate(id, req.body, { new: true })
        res.status(201).json({book})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }

    console.log("update request recieved");
    
}

const deleteBookController = async (req, res) => {
    
      const { id } = req.params
    if(!objectId.isValid(id)) {
        return res.status(400).json({message: "invalid ID"})
    }

    const book = await Book.findByIdAndDelete(id) 
    if(!book) {
        return res.status(400).json({message: "No such book"})
    }
    console.log("delete request recieved");
    

    res.json(book)
      
}

const searchBookController = async (req, res) => {
    const { query } = req.query;
    const user = req.user;
    console.log(query);
    
    try {

        if (!query) {
            return res.status(400).json({ message: 'Invalid query parameter' });
        }

        // Ensure that 'req.user' contains valid user information
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

      const books = await Book.find({
        user,
        $or: [ 
          { name: { $regex: query, $options: 'i' } },
          { 'this.author.name': {$regex: query, $options: 'i'} },
          { 'this.category.name': {$regex: query, $options: 'i'} },
          { 'this.publisher.name': {$regex: query, $options: 'i'} }
        ]
      }) 
      .populate("author")
      .populate("category")
      .populate("publisher")
      .exec();

      
      if(books.length === 0) {
        return res.status(400).json("Book not found!")
      }

      res.status(200).json(books)

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }

    console.log("Search recieved");
    
}

module.exports = {
    getAllBookController,
    getSingleBookController,
    saveBookController,
    editBookController,
    deleteBookController,
    searchBookController
}