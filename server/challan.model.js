const mongoose = require('mongoose');

const challanItemSchema = new mongoose.Schema({
  // No frontend 'id' needed, MongoDB provides a unique '_id' automatically.
  sno: Number,
  particulars: String,
  weight: String,
  quantity: String,
}, { _id: false }); // We don't need separate _id for subdocuments here

const challanSchema = new mongoose.Schema({
  challanNo: { type: String, required: true },
  date: String,
  toMs: { type: String, required: true },
  poNo: String,
  place: String,
  items: [challanItemSchema],
  notes: String,
}, { 
  timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

// Mongoose automatically creates a collection named 'challans' (pluralized)
module.exports = mongoose.model('Challan', challanSchema);
