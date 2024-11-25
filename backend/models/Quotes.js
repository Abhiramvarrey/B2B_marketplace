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

// QuoteSchema.pre('save', function (next) {
//   this.total = this.item.quantity * this.item.price;
//   next();
// });

module.exports = mongoose.model('Quote', QuoteSchema);
