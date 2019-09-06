

import { Hobbies, findHobbies, findHobbiesById, updateHobbies, removeHobbies } from './../models/Hobbies';
import { User, findUserHobbyById } from '../models/User';
import * as  shortid from "shortid";
import { IHobbies } from '../interface/user';

/**
 * HobbiesController
 */
export class HobbiesController {
    app = null;
    constructor(app) {
        this.app = app
    }
    init() {

        return new Promise((res, rej) => {

            this.app.post("/api/v1/hobbies", async (req, res) => {

                try {
                    const { userId, passionLevel, name, year } = req.body;
                     const hobby = { _id: shortid.generate(), passionLevel :passionLevel,name :name,  year: +year};
                    const hobbies = new Hobbies(hobby);
                    await hobbies.save();
                    const user = await findUserHobbyById(userId);
                    user.hobbies.push(hobbies._id)
                    await user.save();
                    res.send({ status: 'success' });
                } catch (err) {
                    console.log('error', err)
                    //TODO: need to handle proper exception with http status code
                    res.send({ status: 'fail', message: err });
                }
            });
            this.app.get("/api/v1/hobbies/:id", async (req, res) => {
                try {
                    const { id } = req.params;
                    const response = await findHobbiesById(id);
                    res.send(response);
                } catch (err) {
                    res.send({ status: 'fail', message: err });
                }
            });
            this.app.get("/api/v1/hobbies", async (req, res) => {
                try {
                    const response = await findHobbies();
                    res.send(response);
                } catch (err) {
                    res.send({ status: 'fail', message: err });
                }
            });

            this.app.delete("/api/v1/hobbies/:id", async (req, res) => {
                try {
                    const { id } = req.params;
                    const response = await removeHobbies(id)
                    res.send(response);
                } catch (err) {
                    res.send({ status: 'fail', message: err });
                }
            });

            this.app.put("/api/v1/hobbies/:id", async (req, res) => {
                try {
                    const { body } = req;
                    const { id } = req.params;
                    const updateModel: IHobbies = <IHobbies>{ passionLevel: body.passionLevel, name: body.name, year: body.year }
                    const response = await updateHobbies(id, updateModel);
                    res.send(response);
                } catch (err) {
                    res.send({ status: 'fail', message: err });
                }
            });
            res(true);
        })
    }
}
