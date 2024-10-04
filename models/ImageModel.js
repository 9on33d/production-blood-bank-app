const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageUrl: { 
      type: String, 
      required: true 
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
  });
  

const ImageModel = mongoose.model('Image', imageSchema);

module.exports = ImageModel;
