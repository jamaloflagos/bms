const { Category } = require('../models/categoryModel');

const category = async(req, res, next) => {
    const { category_name, category_desc} = req.body;
    const user = req.user;

    try {
        
        const category = await Category.create({name: category_name, description: category_desc, user});
        req.category_id = category._id;
        console.log(category);
        // res.status(200).json(category);
        next();        

    } catch (error) {

        res.status(500).json({message: error.message});
        console.log("error in category");
        console.log(error.message);
        
    };
};

module.exports ={ category };