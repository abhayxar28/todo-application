const mongoose = require('mongoose');

const {DatabaseURL} = require('../config');

mongoose.connect(DatabaseURL);

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

const todoSchema = new mongoose.Schema({
    title:{
        type: String
    },
    description: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const User =  mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
    User,
    Todo
}
