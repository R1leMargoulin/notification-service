const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const db = {}
db.mongoose = mongoose
db.items = require('./notifs.model');
module.exports = db