import mongoose from 'mongoose';

const connectDb = handler => async (req, res) => {
    if(mongoose.connections[0].readyState){
        return handler(req, res)
    }
    await mongoose.connect('mongodb+srv://adityastudio:PassworD@cluster0.kllpeia.mongodb.net/?retryWrites=true&w=majority')
    return handler(req, res)
}
export default connectDb;