
/**
 * HobbyModel
 */
export class HobbyModel {
  _id: string = null;
  passionLevel: string = null;
  name: string = null;
  year: number = null;
  userId: string = null;
  constructor(values?: HobbyModel) {
    if (values) {
      Object.assign(this, values);
    }
  }
  /**
   *
   */
  isValid(): boolean {
    return this.userId !== null && this.name !== null && this.passionLevel !== null && this.year !== null;
  }
  /**
   * toJson
   */
  toJson() {
    return {
      passionLevel: this.passionLevel,
      name: this.name,
      year: this.year,
      userId: this.userId
    };
  }

}





