const Quote = require('../models/Quotes');

// Create a new quote
const createQuote = async (req, res) => {
  try {
    const { receiver, item ,total } = req.body;
    const sender = user.req._id;
    
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
const getsentquotes = async (req,res) => {
  try{
    const myquotes = await Quote.find({sender: req.user._id}).populate("sender", "items receiver total")
    if(!myquotes) {
      res.status(404).json({mesage: 'no Quotes send'})
    }
    res.status(200).json(myquotes)
  }
  catch(errror){
    res.status(500).json({ error: error.message })
  }
}

const getreceivedQuotes = async (req,res) =>{
  try{
    const receivedquotes = await Quote.find({receiver: req.user._id})

    if(!receivedquotes){
      res.status(404).json({message: 'no quotes received'})
    }

    res.status(200).json(receivedquotes)
  }
  catch(error){
    res.status(500).json({error: error.message })
  }
}
module.exports = { createQuote, discardQuote,getsentquotes, getreceivedQuotes };
