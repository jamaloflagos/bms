const { Publisher } = require('../models/publisherModel');

const publisher = async(req, res, next) => {
    const { publisher_name, address, country, email, phone} = req.body;
    const user = req.user;
    
    try {
        
        const publisher = await Publisher.create({name: publisher_name, address, country, email, phone, user});
        req.publisher_id = publisher._id;
        console.log(publisher);
        // res.status.json(publisher);        
        next();

    } catch (error) {
        
        res.status(500).json({message: error.message});
        console.log(error.message);
        
    }

}

module.exports = { publisher };