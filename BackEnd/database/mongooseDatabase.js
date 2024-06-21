import mongoose from 'mongoose';

const uri = 'mongodb+srv://tudor:messi123@tudor.d1ahcdf.mongodb.net/?retryWrites=true&w=majority&appName=tudor';

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
}

async function closeDatabaseConnection() {
    try {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Failed to disconnect from MongoDB:', err);
    }
}

export { connect, closeDatabaseConnection };