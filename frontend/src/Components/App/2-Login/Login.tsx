import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel, { Role } from "../../../models/user-model";
import service from "../../../services/user-service";
import Button from "../../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user-state";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { modalActions, ModalType } from "../../../store/modal-state";
import "./Login.css";

interface Props {
  deletePage?: boolean;
  onClose?: Function;
}

function Login(props: Props): JSX.Element {
  const modalType = useSelector((state: any) => state.modal.modalType);
  const isModalVisible = useSelector((state: any) => state.modal.isVisible);
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const { register, handleSubmit, setFocus } = useForm<UserModel>();
  const [header, setHeader] = useState<string>("Welcome Back!");
  const [message, setMessage] = useState<string>("please enter your details");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    handleMessage();
    setFocus("user_name");
    if (props.deletePage || isModalVisible) return;
    if (user.role < Role.Guest) navigate("/homepage");
  }, [user]);

  const handleMessage = () => {
    if (props.deletePage) {
      setHeader("Delete Page");
      return;
    }
    if (isModalVisible) {
      setMessage(
        modalType === ModalType.EXPIRED
          ? "please log in again to continue"
          : "to follow vacations you must log in"
      );
      setHeader(
        modalType === ModalType.EXPIRED ? "Hey Again!" : "Hello Guest!"
      );
    }
  };

  const submitForm = async (details: UserModel) => {
    props.deletePage ? deleteAccount(details) : loginUser(details);
  };

  const loginUser = (details: UserModel) => {
    service
      .login(details)
      .then((res) => {
        if (res.msg) throw new Error(res.msg);
        dispatch(userActions.login(res));
        dispatch(modalActions.hideModal());
        navigate("/homepage");
        return;
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  const deleteAccount = async (details: UserModel) => {
    details.image = user.image;
    details.id = user.id;
    const result = await service.deleteUser(details, user.token);
    if (result) {
      if (result.status === 401) setError(result.msg);
      else dispatch(modalActions.showModal(ModalType.EXPIRED));
      return;
    }
    navigate("/login");
  };

  return (
    <div className={`Login ${props.deletePage && "flow"}`}>
      {props.deletePage && (
        <ArrowCircleLeftIcon
          onClick={() => navigate("/user/profile")}
          sx={{
            color: "rgb(47, 47, 154)",
            fontSize: "3rem",
            ":hover": { fontSize: "3.1rem" },
          }}
          className="delete-form-arrow-back"
        />
      )}
      <form className="login-form" onSubmit={handleSubmit(submitForm)}>
        {isModalVisible && (
          <img
            src={require("../../../images/close-btn.png")}
            alt=""
            onClick={() => props.onClose && props.onClose()}
            className="close-modal-btn"
          />
        )}
        <h2>{header}</h2>
        <span>{error.length > 0 ? error : message}</span>
        <div>
          <label>username:</label>
          <input
            type="text"
            onFocus={() => setError("")}
            style={{ outline: error.length < 1 ? "" : "1px red solid" }}
            {...register("user_name")}
            required
          />
        </div>
        <div>
          <label>password:</label>
          <input
            type="password"
            onFocus={() => setError("")}
            style={{ outline: error.length < 1 ? "" : "1px red solid" }}
            {...register("password")}
            minLength={6}
            required
          />
        </div>
        <Button
          value={props.deletePage ? "delete" : "login"}
          style={{
            marginTop: "1rem",
            backgroundColor: props.deletePage ? "rgb(200, 10, 20)" : "",
          }}
        />
        {!props.deletePage && (
          <div>
            <NavLink to={"/register"} className="register-navlink">
              create new account
            </NavLink>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
