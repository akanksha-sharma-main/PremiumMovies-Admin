const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {type: String, required: True},
    products: [{
            productId: {type: String},
            quantity: {type: Number, default: 1}
        }],
    address: {type: String, required: True},
    amount: {type: Number, required: True},
    status: {type: String, default: 'Pending' , required: true}
}, {timestamps: true});

mongoose.models = {}
export default mongoose.model("Order", OrderSchema)