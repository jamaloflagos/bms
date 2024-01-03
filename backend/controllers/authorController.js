const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose")
const { Author } = require("../models/authorModel");
const objectId = mongoose.Types.ObjectId


const createAuthor =  expressAsyncHandler(async (req, res) => {
    const { name, description, gender, dob, yod, position } = req.body;
    const user = req.user;   
    
    const validateDate = (date) => {
        const dateInput = new Date(date).getTime();

        if (isNaN(dateInput)) return res.status(400).json({message: "Enter a valid date"})
    }

    if (!name || !description || !gender || !position) {
        return res.status(400).json({message: "All input fields are required except D_O_B and Y_O_D"})
    }

    if (dob) {
        validateDate(dob);
    }
    
    if (yod) {
        validateDate(yod);
    }

    const author = await Author.create({ name, description, gender, dob, yod, position, user});

    if (!author) return res.status(400).json({message: "Invalid input type"});
    
    res.json(author);
})

const getAllAuthors = expressAsyncHandler(async (req, res) => {
    const user = req.user;    
    const authors = await Author.find({user});

    if (!authors) return res.sendStatus(204);

    res.json(authors)

})

const getAuthorsName = expressAsyncHandler(async (req, res) => {
    const user = req.user;    
    const authorsName = await Author.find({user}, {name: 1});

    if (!authorsName) return res.sendStatus(204);

    res.json(authorsName);

})

const getSingleAuthor = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    
    if (!id || !objectId.isValid(id)) return res.status(400).json({message: "Invalid ID"});

    // const author = await Author.findOne({_id: id});
    const author = await Author.aggregate([
        {
            $match: {
                _id: new objectId(id)
            }
        }, 

        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "author",
                as: "books"
            }
        },

        {
            $project: {
                _id: 1,
                name: 1,
                gender: 1,

                books: {
                    _id: 1,
                    name: 1,
                    status: 1,
                    nickname: 1
                }
            }
        }
    ]);

    if (!author) return res.status(204).json({message: "Can't find such author"});

    res.json(author)

})


const updateAuthor = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    
    if (!id || !objectId.isValid(id)) return res.status(400).json({message: "Invalid ID"});
    
    const author = await Author.findByIdAndUpdate(id, req.body, {new: true});
    
    if (!author) return res.status(500).json({message: "Can't update author"})
    
    res.json(author)
    
})

const deleteAuthor = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    
    if (!id || !objectId.isValid(id)) return res.status(400).json({message: "Invalid ID"});

    const author = await Author.findByIdAndDelete(id);

    if (!author) return res.status(500).json({message: "Can't delete author"})

    const reply = `${author.name} is deleted`

    res.json({message: reply, author})
})

module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthorsName,
    getSingleAuthor,
    updateAuthor,
    deleteAuthor
}