import mongoose from "mongoose";


const uri = "mongodb+srv://tudor:messi123@tudor.d1ahcdf.mongodb.net/?retryWrites=true&w=majority&appName=tudor";

async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}


export { connect };