const Quote = require('../models/Quotes');

// Create a new quote
const createQuote = async (req, res) => {
  try {
    const { receiver, item ,total } = req.body;
    const sender = user.req._id;
    console.log(sender);
    if (!sender || !receiver || !item.name || !item.quantity || !item.price) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    const quote = new Quote({
      sender,
      receiver,
      item,
      total,
    });

    await quote.save();
    res.status(201).json({ message: 'Quote created successfully', quote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Discard (delete) a quote
const discardQuote = async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await Quote.findById(id);

    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    await quote.remove();
    res.status(200).json({ message: 'Quote discarded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createQuote, discardQuote };
