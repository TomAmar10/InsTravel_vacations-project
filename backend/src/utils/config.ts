class Config {
  public mySQLhost = "127.0.0.1";
  public mySQLUser = "root";
  public mySQLPassword = "12345678";
  public mySqlDB = "vacation";
  public mySqlPort = 3306;
  private AdminUNames = ["tomass", "adammm"];
  public checkAdmin(uname: string) {
    return this.AdminUNames.includes(uname);
  }
}

const config = new Config();
export default config;
