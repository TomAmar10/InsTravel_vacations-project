import axios from "axios";
import UserModel from "../models/user-model";

class Service {
  private userAddress = "http://localhost:4500/api/user";
  private authAddress = "http://localhost:4500/api/auth";

  public getAllUsers = async (): Promise<UserModel[]> => {
    try {
      const response = await axios.get(`${this.userAddress}/all`);
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public getAllUsernames = async (): Promise<any> => {
    try {
      const response = await axios.get(`${this.userAddress}/all/usernames`);
      return response;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public getUser = async (id: number): Promise<UserModel> => {
    try {
      const response = await axios.get(`${this.userAddress}/${id}`);
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public login = async (userCred: UserModel): Promise<any> => {
    try {
      const response = await axios.post(`${this.authAddress}/login`, userCred);
      return response.headers.authorization;
    } catch (err: any) {
      return err.response.data;
    }
  };

  public register = async (user: UserModel): Promise<any> => {
    try {
      const response = await axios.post(`${this.authAddress}/register`, user, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.headers.authorization;
    } catch (err: any) {
      return err.response.data;
    }
  };

  public deleteUser = async (details: UserModel, token: string) => {
    try {
      await axios.post(`${this.authAddress}/delete`, details, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      return err.response.data;
    }
  };

  public updateUser = async (user: UserModel) => {
    try {
      const response = await axios.put(
        `${this.authAddress}/update/${user.id}`,
        user,
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  public updateUserProfile = async (user: any) => {
    try {
      const response = await axios.put(
        `${this.authAddress}/changeprofile/${user.id}`,
        user,
        {
          headers: {
            authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (err: any) {
      return err.response;
    }
  };
}

const service = new Service();
export default service;
