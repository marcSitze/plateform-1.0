import mongoose from 'mongoose';

const mongoConnection = async (connectionString: string) => {

    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.log(err, "Something went wrong while connecting to mongoDB");
    }

}

export default mongoConnection;