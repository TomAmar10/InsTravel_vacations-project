class CredentialsModel {
  public user_name: string;
  public password: string;

  public constructor(user: CredentialsModel) {
    this.user_name = user.user_name;
    this.password = user.password;
  }
}

export default CredentialsModel;
