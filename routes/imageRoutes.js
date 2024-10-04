const express = require('express');
const router = express.Router();
const Image = require('../models/ImageModel');


// Route to fetch  images and data
router.get('/images', async (req, res) => {
    try {
        const images = (await Image.find({})).reverse();
         // Assuming you are using Mongoose
         return res.status(200).send({
            success: true,
            message: "Images fetched successfully",
            data: images
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Failed to fetch images",
            error: error
        });
    }
});





// delete images
router.delete('/images/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedImage = await Image.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Image deleted successfully",
            data: deletedImage
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Failed to delete image",
            error: error
        })
    }
});
  

router.post('/create-inventory',async (req, res) => {
    const {imageUrl, userId,name,age,gender,bloodGroup,height,weight} = req.body;
    const newImage = new Image({ imageUrl: imageUrl, userId,name,age,gender,bloodGroup,height,weight });
    try {
        // Save the image to the database
        const savedImage = await newImage.save();
        res.status(200).send({
            success: true,
            message: "Image uploaded successfully",
            data: savedImage
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Failed to upload image",
            error: error
        })
    }
});

// update image
router.put('/images/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, gender, bloodGroup, height, weight, imageUrl } = req.body;

        // Validate the incoming data
        if (!name || !age || !gender || !bloodGroup || !height || !weight || !imageUrl) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const updatedImage = await Image.findByIdAndUpdate(
            id,
            { name, age, gender, bloodGroup, height, weight, imageUrl },
            { new: true, runValidators: true } // Return the updated document

        );

        if (!updatedImage) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        res.json({ success: true, data: updatedImage });
    } catch (error) {
        console.error('Error updating image:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});




module.exports = router;
