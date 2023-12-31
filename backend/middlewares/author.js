const { Author } = require('../models/authorModel');

const author = async(req, res, next) => {
    const { author_name, author_desc, gender, dob, yod, position } = req.body;
    const user = req.user;
    try {
        
        const author = await Author.create({ name: author_name, description: author_desc, gender, dob, yod, position, user});
        req.author_id = author._id;
        console.log(author);
        // res.status(200).json(author);
        next();

    } catch (error) {

        res.status(500).json({message: error.message});
        console.log(error.message);
        
    }
};

module.exports = { author }