export enum Role {
  Admin = 1,
  User = 2,
}

class UserModel {
  public id: number;
  public first_name: string;
  public last_name: string;
  public user_name: string;
  public password: string;
  public image: string;
  public role: Role;
  public token: string;

  public constructor(user: UserModel) {
    this.id = user.id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.user_name = user.user_name;
    this.password = user.password;
    this.image = user.image;
    this.role = user.role;
    this.token = user.token;
  }
}

export default UserModel;
