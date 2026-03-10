import mongoose from 'mongoose';

const connectDB = async () => {
    try {
<<<<<<< HEAD
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
=======
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
>>>>>>> b7785cd1b691b95f8c258e5604028ee49a0a95f9
        console.log(`\n MongDB connected successfully: ${connectionInstance.connection.host} \n`);
    } catch (error){
        console.log(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;