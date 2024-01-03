const expressAsyncHandler = require("express-async-handler");
const { isEmail } = require("validator");
const  mongoose = require("mongoose")
const { Publisher } = require("../models/publisherModel");
const objectId = mongoose.Types.ObjectId

const createPublisher = expressAsyncHandler(async (req, res) => {
    const { name, address, country, email, phone} = req.body;
    const user = req.user;
    
    if (!name || !country) return res.status(400).json({message: "Name and country is required"});

    if (email) {
        if (!isEmail(email)) return res.status(400).json({message: "Enter a valid email"})
    }
        
    const publisher = await Publisher.create({name, address, country, email, phone, user});

    if (!publisher) return res.status(400).json({message: "Invalid input type"});

    res.json(publisher)
    
})

const getAllPublishers = expressAsyncHandler(async (req, res) => {
    const user = req.user;

    const publishers = await Publisher.find({user});

    if (!publishers) return res.sendStatus(204)

    res.json(publishers)
})

const getPublishersName = expressAsyncHandler(async (req, res) => {
    const user = req.user;    
    const publishersName = await Publisher.find({user}, {name: 1});

    if (!publishersName) return res.sendStatus(204);

    res.json(publishersName);

})

const getSinglePublisher = expressAsyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id || !objectId.isValid(id)) return res.status(400).json({message: "Invalid ID"});

    // const publisher = await Publisher.findOne({_id: id});

    const publisher = await Publisher.aggregate([
        {
            $match: {
                _id: new objectId(id)
            }
        }, 

        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "publisher",
                as: "books"
            }
        },

        {
            $project: {
                _id: 1,
                name: 1,
                // gender: 1,

                books: {
                    _id: 1,
                    name: 1,
                    status: 1,
                    nickname: 1
                }
            }
        }
    ])

    if (!publisher) return res.status(204).json({message: "No such publisher"});

    res.json(publisher);

})

const updatePublisher = expressAsyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id || !objectId.isValid(id)) return res.status(400).json({message: "Invalid ID"});

    const publisher = await Publisher.findByIdAndUpdate(id, req.body, {new: true});

    if (!publisher) return res.status(500).json({message: "Can't update publisher"});

    res.json(publisher);

})

const deletePublisher = expressAsyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id || !objectId.isValid(id)) return res.status(400).json({message: "Invalid ID"});

    const publisher = await Publisher.findByIdAndDelete(id);

    if (!publisher) return res.status(500).json({message: "Can't delete publisher"});

    const reply = `${publisher.name} is deleted`

    res.json({message: reply, publisher});

})


module.exports = {
    createPublisher,
    getAllPublishers,
    getPublishersName,
    getSinglePublisher,
    updatePublisher,
    deletePublisher
}