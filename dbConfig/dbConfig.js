import mongoose from "mongoose";

export async function connect() {

    try {
        if (!process.env.MONGO_URI) {
            throw new Error("Mongo URI not provided");
        }

        mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB connected')
        })
        connection.on('error', (err) => {
            console.log('error connecting to MongoDB')
            console.log(err)
            process.exit(1)
        })
    } catch (error) {
        console.log('Something went wrong in connection to DB');
        console.log(error);
    }
}