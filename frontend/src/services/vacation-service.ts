import axios from "axios";
import VacationModel from "../models/vacation-model";

class Service {
  public getAllVacations = async (userID: number): Promise<VacationModel[]> => {
    const response = await axios.get(
      "http://localhost:4500/api/vacation/all/id/" + userID
    );
    return response.data;
  };

  public getFollowedVacations = async (): Promise<VacationModel[]> => {
    const response = await axios.get(
      "http://localhost:4500/api/vacation/all/followed"
    );
    return response.data;
  };

  public getSorted = async (
    userID: number,
    sortBy: string,
    order: string
  ): Promise<any> => {
    try {
      const response = await axios.get(
        `http://localhost:4500/api/vacation/all/${userID}/${sortBy}/${order}`
      );
      return response;
    } catch (err: any) {
      return err.response;
    }
  };

  public getMaxPrice = async (
    userID: number,
    max: number,
    sortBy: string,
    order: string
  ): Promise<any> => {
    try {
      const response = await axios.get(
        `http://localhost:4500/api/vacation/all/price/${userID}/${max}/${sortBy}/${order}`
      );
      return response;
    } catch (err: any) {
      return err.response;
    }
  };

  public getVacation = async (id: number): Promise<VacationModel> => {
    const response = await axios.get(
      `http://localhost:4500/api/vacation/${id}`
    );
    response.data[0].start = response.data[0].start.split("T")[0];
    response.data[0].finish = response.data[0].finish.split("T")[0];
    return response.data[0];
  };

  public getVacationByName = async (dest: string): Promise<VacationModel[]> => {
    const response = await axios.get(
      `http://localhost:4500/api/vacation/destination/${dest}`
    );
    return response.data;
  };

  public addVacation = async (
    vacation: VacationModel,
    token: string
  ): Promise<any> => {
    try {
      const response = await axios.post(
        "http://localhost:4500/api/vacation/all",
        vacation,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (err: any) {
      return err.response;
    }
  };

  public deleteVacation = async (id: number, token: string) => {
    try {
      await axios.delete("http://localhost:4500/api/vacation/" + id, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      return err.response;
    }
  };

  public updateVacation = async (
    vacation: VacationModel,
    id: number,
    token: string
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:4500/api/vacation/${id}`,
        vacation,
        {
          headers: {
            authorization: `Bearer ${token}`,
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
