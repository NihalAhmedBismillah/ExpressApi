import * as  mongoose from "mongoose";
import { IHobbies } from "../interface/user";

/**
 * hobbiesSchema
 */
const hobbiesSchema = new mongoose.Schema({
    _id: { type: String },
    passionLevel: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

const Hobbies = mongoose.model('Hobbies', hobbiesSchema);

const findHobbiesById = async (id: string) => await Hobbies.findOne({ _id: id });
const findHobbies = async () => await Hobbies.find();
const removeHobbies = async (id: string) => await Hobbies.deleteOne({ _id: id });
const updateHobbies = async (id: string, updateModel: IHobbies) => await Hobbies.updateOne({ _id: id }, updateModel);

export { Hobbies, findHobbiesById, findHobbies, removeHobbies, updateHobbies };

