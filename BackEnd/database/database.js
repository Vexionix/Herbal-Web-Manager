const mongoose = require('mongoose');

// Replace 'your-connection-string-here' with your actual MongoDB connection string.
const uri = 'mongodb://localhost:27017/nodedemo';  // Adjust the URI as per your MongoDB setup

// Function to connect to MongoDB using Mongoose
async function connectWithMongoose() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,  // Optional, use if needed
      useFindAndModify: false  // Optional, use if needed
    });
    console.log('Connected to MongoDB');

    // Example operation: Create a simple schema and model
    const testSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', testSchema);

    // Example operation: Insert a document
    const doc = new TestModel({ name: 'Mongoose Test' });
    await doc.save();

    // Example operation: Find the inserted document
    const result = await TestModel.findOne({ name: 'Mongoose Test' });
    console.log('Found document:', result);

    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

// Immediately Invoked Function Expression (IIFE) to run the connection function
(async () => {
  await connectWithMongoose();
})();

module.exports = { connectWithMongoose };
