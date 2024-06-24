const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/nodedemo';

async function connectWithMongoose() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Connected to MongoDB');

    const testSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', testSchema);

    const doc = new TestModel({ name: 'Mongoose Test' });
    await doc.save();

    const result = await TestModel.findOne({ name: 'Mongoose Test' });
    console.log('Found document:', result);

    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

(async () => {
  await connectWithMongoose();
})();

module.exports = { connectWithMongoose };
