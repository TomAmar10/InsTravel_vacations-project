import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../models/user-model";
import { useForm } from "react-hook-form";
import service from "../../../services/user-service";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/user-state";
import Button from "../../UI/Button/Button";
import "./Register.css";

interface registerUser extends UserModel {
  confirmPass: string;
}
function Register(): JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const { register, handleSubmit, setFocus } = useForm<registerUser>();
  const [allUsernames, setAllUsernames] = useState<{}[]>([]);
  const [isValidUsername, setIsValidUsername] = useState<boolean>(true);
  const [isValidPass, setIsValidPass] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setFocus("first_name");
    if (user.id > 0) {
      navigate("/homepage");
      return;
    }
    service
      .getAllUsernames()
      .then((res) => setAllUsernames(res))
      .catch((err) => setError("something went wrong, please try again later"));
  }, []);

  const submitForm = (newUser: registerUser) => {
    if (error.length > 0) return;
    if (newUser.password !== newUser.confirmPass) {
      setIsValidPass(false);
      return;
    }

    if (allUsernames.find((u: any) => u.user_name === newUser.user_name)) {
      setIsValidUsername(false);
      return;
    }
    newUser.first_name = upperCaseFirstLetter(newUser.first_name);
    newUser.last_name = upperCaseFirstLetter(newUser.last_name);
    newUser.image = newUser.image[0];
    service
      .register(newUser)
      .then((res) => {
        if (res.msg) throw new Error(res.msg);
        dispatch(userActions.login(res));
        navigate("/homepage");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const upperCaseFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="Register">
      <form className="register-form" onSubmit={handleSubmit(submitForm)}>
        <h2>Hello !</h2>
        {error.length > 0 && <h4 style={{ color: "red" }}>{error}</h4>}
        <div>
          <label>* first name:</label>
          <input
            type="text"
            required
            minLength={2}
            {...register("first_name")}
          />
        </div>
        <div>
          <label>* last name:</label>
          <input
            type="text"
            required
            minLength={2}
            {...register("last_name")}
          />
        </div>
        <div>
          <label>* username:</label>
          <div className="register-input-area">
            {!isValidUsername && <span>already exist... </span>}
            <input
              type="text"
              minLength={2}
              style={{ borderColor: isValidUsername ? "black" : "red" }}
              onFocus={() => setIsValidUsername(true)}
              required
              {...register("user_name")}
            />
          </div>
        </div>
        <div>
          <label>* password:</label>
          <input
            type="password"
            minLength={6}
            pattern="(?=.*\d)(?=.*[a-z]).{6,}"
            required
            {...register("password")}
          />
        </div>
        <div>
          <label>* confirm:</label>
          <div className="register-input-area">
            {!isValidPass && <span>must be the same as password... </span>}
            <input
              type="password"
              minLength={6}
              {...register("confirmPass")}
              style={{ borderColor: isValidPass ? "black" : "red" }}
              onKeyDown={() => setIsValidPass(true)}
              required
            />
          </div>
        </div>
        <div>
          <label>Profile image:</label>
          <input type="file" {...register("image")} />
        </div>
        <Button value="register" style={{ marginTop: "2rem" }} />
      </form>
    </div>
  );
}

export default Register;
