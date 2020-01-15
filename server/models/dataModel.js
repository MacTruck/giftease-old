const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	people: [],
	hints: []
});

const person = new Schema({
	name: { type: String, required: true, unique:true },
	gifts: [],
});

module.exports = mongoose.model('Data', dataSchema, 'userData');