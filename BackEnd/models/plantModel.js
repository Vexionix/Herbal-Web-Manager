import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
    id: String,
    name: String,
    created_at: Date,
    updated_at: Date,
    color: String,
    photo: String,
    description: String,
    type: String,
    views : Number,
    downloads: Number
  });
  
  const Plant = mongoose.model('Plant', plantSchema);
  
export default Plant;