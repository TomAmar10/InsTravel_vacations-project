import axios from "axios";
import UserModel from "../models/user-model";

class Service {
  public getAllUsers = async (): Promise<UserModel[]> => {
    try {
      const response = await axios.get("http://localhost:4500/api/user/all");
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public getAllUsernames = async (): Promise<any> => {
    try {
      const response = await axios.get(
        "http://localhost:4500/api/user/all/usernames"
      );
      return response;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public getUser = async (id: number): Promise<UserModel> => {
    try {
      const response = await axios.get(`http://localhost:4500/api/user/${id}`);
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public login = async (userCred: UserModel): Promise<any> => {
    try {
      const response = await axios.post(
        `http://localhost:4500/api/auth/login`,
        userCred
      );
      return response.headers.authorization;
    } catch (err: any) {
      return err.response.data;
    }
  };

  public register = async (user: UserModel): Promise<any> => {
    try {
      const response = await axios.post(
        "http://localhost:4500/api/auth/register",
        user,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.headers.authorization;
    } catch (err: any) {
      return err.response.data;
    }
  };

  public deleteUser = async (details: UserModel, token: string) => {
    try {
      await axios.post("http://localhost:4500/api/auth/delete", details, {
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
        `http://localhost:4500/api/auth/id/${user.id}`,
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
        `http://localhost:4500/api/auth/changeprofile/${user.id}`,
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

  public refreshToken = async (user: any) => {
    try {
      const response = await axios.put(
        `http://localhost:4500/api/auth/refresh-token`,
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      return response;
    } catch (err: any) {
      return err.response;
    }
  };
}

const service = new Service();
export default service;
