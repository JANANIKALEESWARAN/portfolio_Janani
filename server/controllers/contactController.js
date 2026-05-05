const Contact = require('../models/Contact');
const { sendContactEmail } = require('../services/emailService');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Save to database
    const contact = new Contact({ name, email, message });
    await contact.save();
    
    // Send email notification
    const emailResult = await sendContactEmail({ name, email, message });
    
    if (!emailResult.success) {
      console.error('Email failed but message saved:', emailResult.error);
      // Still return success since message was saved
      return res.status(201).json({ 
        message: 'Message received! I\'ll get back to you soon. 🎉',
        emailSent: false 
      });
    }
    
    res.status(201).json({ 
      message: 'Message received! I\'ll get back to you soon. 🎉',
      emailSent: true 
    });
  } catch (err) {
    console.error('Contact submission error:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
