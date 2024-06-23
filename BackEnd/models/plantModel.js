import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: String,
  posted_by: String,
  family: String,
  species: String,
  place: String,
  color: String,
  collected_at: Date,
  views: Number,
  likes: Number
});

const Plant = mongoose.model('Plant', plantSchema);

export default Plant;