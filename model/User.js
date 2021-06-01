import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name : {type:String, required: true},
    email : {type:String, required: true, unique: true},
    password : {type:String, required: true},
    image : {type:String, default: "/images/default.png", required: true},
    role : {type:String, default: "user"},
    date : {type:Date, default : Date.now},
  

}, {timestamps : true});

const User = mongoose.model('user', UserSchema);
export default User;