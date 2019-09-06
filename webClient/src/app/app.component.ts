import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/user.service";
import { HobbiesService } from "./services/hobbies.service";
import { UserModel } from '../../src/app/model/user.model';
import { HobbyModel } from './../../src/app/model/hobby.model';
import { passionLevel } from '../app/libs/constant';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  selectedIndex: number = null;
  passionLevels = passionLevel;
  user: UserModel = new UserModel();
  users: Array<UserModel> = new Array<UserModel>();
  hobbies: Array<HobbyModel> = new Array<HobbyModel>();
  hobby: HobbyModel = new HobbyModel();
  selectedUserId: string = null; selectedHobbyId: string = null;
  selectedUserName: string = null;

  constructor(public userService: UserService, public hobbyService: HobbiesService) { }

  async ngOnInit() {
    await this.getUsers();
  }
  /**
   * Get Users
   */
  getUsers(): Promise<void> {
    return new Promise((res, rej) => {
      this.userService.getUserDetails().subscribe((users: Array<UserModel>) => {
        this.users = [];
        users.forEach((user: UserModel) => {
          this.users = [...this.users, new UserModel(user)];
          res();
        });
      });
    });
  }

  /**
   * Add user
   */
  addUser() {
    if (!this.user.name) {
      return;
    } else {
      this.userService.saveUser({ name: this.user.name }).subscribe(async () => {
        this.user.name = null;
        await this.getUsers();
      });
    }
  }

  /**
   * Add hobby
   */
  addHobby() {
    this.hobby.userId = this.selectedUserId;
    const hobby = new HobbyModel(this.hobby);
    if (!hobby.isValid()) {
      return;
    } else {
      this.hobbyService.saveHobby(hobby.toJson()).subscribe(async () => {
        this.hobby = new HobbyModel();
        await this.getUserHobbies();
      });
    }
  }
  async getUserHobbies(): Promise<void> {
    return new Promise<void>((res, rej) => {
      this.userService.getUserDetailsById(this.selectedUserId).subscribe((user: UserModel) => {
        this.hobbies = [];
        // Update user hobbies
        user.hobbies.forEach((hobby: HobbyModel) => {
          this.hobbies = [...this.hobbies, new HobbyModel(hobby)];
        });
        this.users.forEach((x: UserModel) => {
          if (x._id === this.selectedUserId) {
            x.hobbies = this.hobbies;
          }
        });
      });
    });
  }
  /**
   *
   * @param hobby
   */
  openRemovePopup(hobby: HobbyModel) {
    this.selectedHobbyId = hobby._id;
  }
  /**
   *Remove user hobby
   */
  removeUserHobby() {
    if (!this.selectedHobbyId) {
      return;
    } else {
      this.hobbyService.removeHobby(this.selectedHobbyId).subscribe(async () => {
        this.selectedHobbyId = null;
        await this.getUserHobbies();
      });
    }

  }

  /**
   * Selected user
   * @param user
   */
  selectedUser(user: UserModel, index: number) {
    this.selectedUserId = user._id;
    this.selectedIndex = index;
    this.selectedUserName = user.name;
    this.hobbies = [];
    if (user.hasHobby) {
      user.hobbies.forEach((hobby: HobbyModel) => {
        this.hobbies = [... this.hobbies, new HobbyModel(hobby)];
      });
    }
  }
}
