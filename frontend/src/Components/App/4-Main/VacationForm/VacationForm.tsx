import React, { SyntheticEvent, useEffect, useState } from "react";
import VacationModel from "../../../../models/vacation-model";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../../../services/vacation-service";
import Button from "../../../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import VacationBox from "../HomePage/VacationBox/VacationBox";
import "./VacationForm.css";
import { modalActions, ModalType } from "../../../../store/modal-state";

function VacationForm(): JSX.Element {
  const dispatch = useDispatch();
  const defaultImage = require("../../../../images/vacation-bg.jpg");
  const urlPath = "http://localhost:4500/";
  const currDate = new Date().toISOString().split("T")[0];
  const user = useSelector((state: any) => state.user.user);
  const [returnDate, setReturnDate] = useState<string>(currDate);
  const [prevVacation, setPrevVacation] = useState<VacationModel>(
    new VacationModel()
  );
  const [imgName, setImgName] = useState<string>(defaultImage);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<VacationModel>();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      service.getVacation(+params.id).then((res) => {
        setPrevVacation(res);
        reset(res);
        setImgName(urlPath + res.image);
      });
      return;
    }
  }, [user]);

  const handleDatesMinimum = (args: SyntheticEvent) => {
    handleChanges(args, "start");
    const value = (args.target as HTMLInputElement).value;
    const nextDay = new Date(value).getDate() + 1;
    const minReturnDate = new Date(new Date(value).setDate(nextDay))
      .toISOString()
      .split("T")[0];
    setReturnDate(minReturnDate);
  };

  const handleImageChange = (args: SyntheticEvent) => {
    const value = (args.target as HTMLInputElement).files;
    if (value && value[0]) {
      const newImg = URL.createObjectURL(value[0]);
      setImgName(newImg);
    } else {
      if (params.id) {
        setImgName(urlPath + prevVacation.image);
      } else setImgName(defaultImage);
    }
  };

  const handleChanges = (args: SyntheticEvent, myString: string) => {
    if (error) setError(undefined);
    let value: any = (args.target as HTMLInputElement).value;
    const newV: any = { ...prevVacation };
    for (var i = 0; i < Object.keys(newV).length; i++) {
      if (myString === Object.keys(newV)[i]) {
        newV[Object.keys(newV)[i]] = value;
      }
    }
    setPrevVacation(newV);
  };

  const send = async (newV: VacationModel) => {
    // loop below is for submitting with enter key press.
    Object.keys(newV).forEach((key: any) => {
      if (!(newV as any)[key]) {
        (newV as any)[key] = (prevVacation as any)[key];
      }
    });
    newV.destination = upperCaseVacation(newV.destination);
    newV.image = newV.image[0];
    newV.prevImgName = prevVacation.image;
    const result = params.id
      ? await service.updateVacation(newV, prevVacation.id, user.token)
      : await service.addVacation(newV, user.token);
    if (result.status === 200 || 201) {
      navigate("/homepage");
      return;
    }
    if (result.status === 403)
      dispatch(modalActions.showModal(ModalType.EXPIRED));
    else setError(result.data.msg);
  };

  const upperCaseVacation = (v: string) => {
    return v
      .split(" ")
      .map((u) => u[0].toUpperCase() + u.slice(1))
      .join(" ");
  };

  return (
    <div className="VacationForm flow">
      <form onSubmit={handleSubmit(send)} autoComplete="off">
        <h2> {params.id ? "Edit vacation" : "Add vacation"} </h2>
        <p className="error-message">{error && error}</p>
        <div>
          <label>* Destination:</label>
          <input
            type="text"
            maxLength={15}
            required
            {...register("destination")}
            onChange={(event) => handleChanges(event, "destination")}
          />
        </div>
        <div>
          <label>* Description: </label>
          <input
            type="text"
            maxLength={100}
            required
            {...register("description")}
            onChange={(event) => handleChanges(event, "description")}
          />
        </div>
        <div>
          <label>* Start:</label>
          <input
            type="date"
            {...register("start")}
            onChange={handleDatesMinimum}
            required
            min={currDate}
          />
        </div>
        <div>
          <label>* Finish:</label>
          <input
            type="date"
            {...register("finish")}
            onChange={(event) => handleChanges(event, "finish")}
            required
            min={returnDate}
          />
        </div>
        <div>
          <label>{!params.id && "* "}Image: </label>
          <input
            type="file"
            {...register("image")}
            onChange={handleImageChange}
            name="image"
            required={params.id ? false : true}
            accept=".jpg, .jpeg, .png, .webp"
          />
        </div>
        <div>
          <label>* Price:</label>
          <input
            type="number"
            min={1}
            max={99999}
            {...register("price", { valueAsNumber: true })}
            onChange={(event) => handleChanges(event, "price")}
            required
          />
        </div>
        <div>
          <Button value={params.id ? "save" : "add"} />
        </div>
      </form>
      {prevVacation && (
        <VacationBox vacation={prevVacation} imgToShow={imgName} />
      )}
    </div>
  );
}

export default VacationForm;
