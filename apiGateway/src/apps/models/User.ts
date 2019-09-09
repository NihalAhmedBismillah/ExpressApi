

import * as  mongoose from "mongoose";
import { IUser } from "../interface/user";
/**
 * userSchema
 */
let userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hobbies: [{
        type: String,
        ref: 'Hobbies'
    }]

});

const User = mongoose.model('User', userSchema);
const findUserByName = async (name: string) => await User.findOne({ name: name });
const findUserById = async (id: string) => await User.findOne({ _id: id }).populate('hobbies');
const findUsersHobbies = async () => await User.find().populate('hobbies');
const removeUser = async (id: string) => await User.deleteOne({ _id: id });
const updateUser = async (id: string, updateModel: IUser) => await User.updateOne({ _id: id }, { name: updateModel.name });

export { User, findUserByName, findUserById, findUsersHobbies, removeUser, updateUser };