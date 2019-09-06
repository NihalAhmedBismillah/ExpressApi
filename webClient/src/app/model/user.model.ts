import { HobbyModel } from './hobby.model';

/**
 * UserModel
 */
export class UserModel {
  _id: string = null;
  name: string = null;
  hobbies: Array<HobbyModel> = [];

  constructor(values?: UserModel) {

    if (values) {
      Object.assign(this, values);
      this.hobbies = [];
      if (values.hobbies) {
        values.hobbies.forEach((hobby: HobbyModel) => {
          this.hobbies = [...this.hobbies, new HobbyModel(hobby)];
        });
      }
    }
  }
  /**
   * hasHobby
   */
  hasHobby(): boolean {
    return this.hobbies.length !== 0;
  }

}
