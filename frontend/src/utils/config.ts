class Config {
  private address = "http://localhost:4500/api";
  public vacationsAPI = `${this.address}/vacation`;
  public userAPI = `${this.address}/user`;
  public authAPI = `${this.address}/auth`;
  public followAPI = `${this.address}/follow`;
}

const config = new Config();
export default config;
