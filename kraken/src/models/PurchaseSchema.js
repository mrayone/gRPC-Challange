
const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  userId: String,
});



module.exports = mongoose.model("Purchase", PurchaseSchema);