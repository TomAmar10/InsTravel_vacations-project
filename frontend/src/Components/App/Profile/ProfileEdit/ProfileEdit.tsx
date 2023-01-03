import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../../models/user-model";
import { useForm } from "react-hook-form";
import service from "../../../../services/user-service";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../store/user-state";
import Button from "../../../UI/Button/Button";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { modalActions, ModalType } from "../../../../store/modal-state";
import "./ProfileEdit.css";

function ProfileEdit(): JSX.Element {
  interface UserEdit extends UserModel {
    prevPass: string;
  }
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const { register, handleSubmit, reset } = useForm<UserEdit>();
  const [allUsernames, setAllUsernames] = useState<{}[]>([]);
  const [isValidUsername, setIsValidUsername] = useState<boolean>(true);
  const [isValidPass, setIsValidPass] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    reset({ ...user, password: "", prevPass: "" });
    service.getAllUsernames().then((res) => {
      if (res.status === 200) {
        const uNames = res.data.map((u: any) => u.user_name);
        setAllUsernames(uNames);
        return;
      }
      setError("something went wrong, please try again later..");
    });
  }, [user, reset]);

  const submitForm = async (newUser: UserEdit) => {
    if (
      allUsernames.includes(newUser.user_name) &&
      newUser.user_name !== user.user_name
    ) {
      setIsValidUsername(false);
      return;
    }
    const result = await service.updateUser(newUser);
    if (result.status === 201) {
      dispatch(userActions.login(result.headers.authorization));
      navigate("/homepage");
      return;
    }
    if (result.status === 401) {
      setError(result.msg);
      return;
    }
    if (result.status === 403) {
      dispatch(modalActions.showModal(ModalType.EXPIRED));
      return;
    }
    setError("something went wrong, please try again later");
  };

  return (
    <div className="ProfileEdit flow">
      <form className="profile-edit-form" onSubmit={handleSubmit(submitForm)}>
        <ArrowCircleLeftIcon
          onClick={() => navigate("/user/profile")}
          sx={{
            color: "rgb(47, 47, 154)",
            fontSize: "3rem",
            ":hover": { fontSize: "3.1rem" },
          }}
          className="edit-form-arrow-back"
        />
        <h3>Edit your profile</h3>
        {error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label>first name:</label>
          <input
            type="text"
            required
            minLength={2}
            {...register("first_name")}
          />
        </div>
        <div>
          <label>last name:</label>
          <input
            type="text"
            required
            minLength={2}
            {...register("last_name")}
          />
        </div>
        <div>
          <label>username:</label>
          <div className="edit-input-area">
            {!isValidUsername && <span>already exist... </span>}
            <input
              type="text"
              required
              onKeyDown={() => setIsValidUsername(true)}
              style={{
                outline: isValidUsername ? "" : "1px red solid",
              }}
              minLength={2}
              {...register("user_name")}
            />
          </div>
        </div>
        <div>
          <label>password:</label>
          <div className="edit-input-area">
            {!isValidPass && <span>wrong password... </span>}
            <input
              type="password"
              placeholder="previous password"
              minLength={6}
              onKeyDown={() => setIsValidPass(true)}
              style={{
                outline: isValidPass ? "" : "1px red solid",
              }}
              {...register("prevPass")}
              required
            />
          </div>
        </div>
        <div>
          <label>new password:</label>
          <input
            type="password"
            minLength={6}
            placeholder={"new password"}
            {...register("password")}
            required
          />
        </div>
        <Button value="save" />
      </form>
    </div>
  );
}

export default ProfileEdit;
