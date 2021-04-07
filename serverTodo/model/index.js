const crypto = require('crypto');
//引入mogoose模块
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//定义User Schema
const UserSchema = new Schema({
  uid: String,
  username: String,
  password: String
})
const User = mongoose.model('User', UserSchema)
//定义TodoItem Schema
const TodoItemSchema = new Schema({
  uid: String,
  id: String,
  title: String,
  completed: Boolean
})
const TodoItem = mongoose.model('TodoItem', TodoItemSchema)
//连接mongodb
mongoose.connect('mongodb://localhost:27017/todoMVC')

module.exports = {
  User,
  TodoItem
}