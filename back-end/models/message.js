const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    by: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, required: true }
});

module.exports = mongoose.model('Message', messageSchema);