const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
{
    name: { type: String, unique: true },
    image: { type: String },
    brand: { type: String },
    category: { type: String },
    description: { type: String },
    price: { type: Number },
    countInStock: { type: Number },
},
{
    timestamps: true,
}
);
module.exports = Product = mongoose.model('Product', productSchema);