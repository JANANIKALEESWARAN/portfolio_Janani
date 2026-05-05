const express = require('express');
const router = express.Router();
const { submitContact, getAllMessages, markAsRead } = require('../controllers/contactController');

router.post('/', submitContact);
router.get('/', getAllMessages);
router.patch('/:id/read', markAsRead);

module.exports = router;
