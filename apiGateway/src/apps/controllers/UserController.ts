

import { User, findUserById, findUsersHobbies, removeUser, updateUser } from './../models/User';
import * as  shortid from "shortid";
import { IUser } from '../interface/user';

/**
 * UserController
 */
export class UserController {

    app = null;
    constructor(app) {
        this.app = app
    }
    init() {
        return new Promise((res, rej) => {

            this.app.post("/api/v1/users", async (req, res) => {
                try {
                    const { name } = req.body;
                    const user = new User({ name: name, _id: shortid.generate() });
                    await user.save()
                    res.send({ status: 'success' });
                } catch (err) {
                    //TODO: need to handle proper exception with http status code
                    res.send({ status: 'fail', message: err });
                }
            });

            this.app.get("/api/v1/users/:id", async (req, res) => {
                try {
                    const { id } = req.params;
                    const response = await findUserById(id);
                    res.send(response);
                } catch (err) {
                    res.send({ status: 'fail', message: err });
                }
            });
            this.app.get("/api/v1/users", async (req, res) => {
                try {
                    const response = await findUsersHobbies();
                    res.send(response);
                } catch (err) {
                    res.send({ status: 'fail', message: err });
                }
            });

            this.app.delete("/api/v1/users/:id", async (req, res) => {
                try {
                    const { id } = req.params;
                    const response = await removeUser(id)
                    res.send(response);
                } catch (err) {
                    res.send({ status: 'fail', message: err });
                }
            });

            this.app.put("/api/v1/users/:id", async (req, res) => {
                try {
                    const { body } = req;
                    const { id } = req.params;
                    const updateModel: IUser = <IUser>{ name: body.name }
                    const response = await updateUser(id, updateModel);
                    res.send(response);
                } catch (err) {
                    res.send({ status: 'fail', message: err });
                }
            });
            res(true);
        })
    }
}
