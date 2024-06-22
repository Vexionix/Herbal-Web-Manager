import mongoose from 'mongoose';

const uri = 'mongodb+srv://tudor:messi123@tudor.d1ahcdf.mongodb.net/?retryWrites=true&w=majority&appName=tudor';

let isConnected = false;

export async function connect() {
    if (isConnected) {
        return;
    }
    try {
        await mongoose.connect(uri, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        });
        isConnected = true;
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
}

export async function closeDatabaseConnection() {
    if (isConnected) {
        try {
            await mongoose.disconnect();
            isConnected = false;
            console.log('Database disconnected');
        } catch (error) {
            console.error('Error disconnecting from database:', error);
            throw error;
        }
    }
}