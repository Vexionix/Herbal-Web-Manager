import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
    username: { type: String, required: true },
    plant_name: { type: String, required: true }
});

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;