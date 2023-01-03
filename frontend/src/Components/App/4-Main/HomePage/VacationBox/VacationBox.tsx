import "./VacationBox.css";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../../../models/vacation-model";
import Button2 from "../../../../UI/FollowButton/FollowButton";
import UserModel, { Role } from "../../../../../models/user-model";
import React, { useEffect, useState } from "react";
import FollowService from "../../../../../services/follow-service";
import { useDispatch, useSelector } from "react-redux";
import service from "../../../../../services/vacation-service";
import Spinner from "../../../../UI/Spinner/Spinner";
import { modalActions, ModalType } from "../../../../../store/modal-state";

interface Props {
  vacation: VacationModel;
  imgToShow?: string;
  handleVisible?: Function;
}

function VacationBox(props: Props): JSX.Element {
  const params = useParams();
  const dispatch = useDispatch();
  const [vacation, setVacation] = useState<VacationModel>(props.vacation);
  const user: UserModel = useSelector((state: any) => state.user.user);
  const [isFollow, setIsFollow] = useState<number>(props.vacation.follower_id);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (props) {
      setVacation(props.vacation);
      setIsFollow(props.vacation.follower_id);
      setIsLoading(false);
    }
    if (params.id && !props) {
      service
        .getVacation(+params.id)
        .then((res) => setVacation(res))
        .then(() => {
          setIsLoading(false);
        });
    }
  }, [props, user]);

  const followHandler = async () => {
    if (user.role > Role.User) {
      dispatch(modalActions.showModal(ModalType.GUEST));
      return;
    }
    if (isFollow) {
      const result = await FollowService.deleteFollow(
        vacation.id,
        user.id,
        user.token
      );
      if (result) {
        dispatch(modalActions.showModal(ModalType.EXPIRED));
        return;
      }
    }
    if (!isFollow) {
      const newFollow = { vacation_id: vacation.id, follower_id: user.id };
      const result = await FollowService.addFollow(newFollow, user.token);
      if (result) {
        dispatch(modalActions.showModal(ModalType.EXPIRED));
        return;
      }
    }
    setIsFollow((prev) => +!prev);
  };

  return (
    <div className="VacationBox flow">
      {user.role === Role.Admin ? (
        !props.imgToShow && (
          <React.Fragment>
            <img
              src={require("../../../../../images/delete.png")}
              alt={vacation.destination}
              onClick={() => dispatch(modalActions.adminModal(vacation))}
              className="delete-img"
            />
            <img
              src={require("../../../../../images/edit.png")}
              alt=""
              onClick={() => navigate(`/vacation/edit/${vacation.id}`)}
              className="edit-img"
            />
          </React.Fragment>
        )
      ) : (
        <Button2
          style={{ backgroundColor: isFollow ? "rgb(47, 47, 154)" : "green" }}
          value={isFollow ? "unfollow" : "follow"}
          onClick={followHandler}
        />
      )}
      <div className="vacation-description">
        <p>{vacation.description}</p>
      </div>
      {isLoading ? (
        <div className="img-loading-spinner">
          <Spinner />
        </div>
      ) : (
        <img
          src={
            props.imgToShow
              ? props.imgToShow
              : `http://localhost:4500/${vacation.image}`
          }
          alt=""
          className="destination-img"
        />
      )}
      <div className="details-container">
        <div className="top-vacation-box">
          <h3>{vacation.destination}</h3>
          <div className="vacation-price">
            {vacation.price.toLocaleString()}$
          </div>
        </div>
        <div className="vacation-dates">
          <span>{vacation.start.split("T")[0]}</span> →
          <span>{vacation.finish.split("T")[0]}</span>
        </div>
      </div>
    </div>
  );
}

export default VacationBox;
