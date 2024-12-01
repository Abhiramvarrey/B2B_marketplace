const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Quote', QuoteSchema);
