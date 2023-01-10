import axios from "axios";
import FollowModel from "../models/follow-model";

class Service {
  private address = "http://localhost:4500/api/follow";
  public getAllFollows = async (): Promise<FollowModel[]> => {
    const response = await axios.get(`${this.address}/all`);
    return response.data;
  };

  public addFollow = async (follow: {}, token: string): Promise<any> => {
    try {
      await axios.post(`${this.address}/all`, follow, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  public deleteFollow = async (
    vacationId: number,
    followerId: number,
    token: string
  ) => {
    try {
      await axios.delete(`${this.address}/id/${vacationId}/${followerId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      return err.response.data.msg;
    }
  };
}

const service = new Service();
export default service;
