import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, NavLink } from "react-router-dom";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import { useSelector } from "react-redux";
import UserModel from "../../../models/user-model";
import ProfileEdit from "./ProfileEdit/ProfileEdit";
import ChangePicture from "./ChangePicture/ChangePicture";
import "./Profile.css";
import Login from "../2-Login/Login";

function Profile(): JSX.Element {
  const [currImage, setCurrImage] = useState<string>(
    "http://localhost:4500/profile.png"
  );
  const user: UserModel = useSelector((state: any) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrImage(`http://localhost:4500/${user.image}`);
  }, [user]);

  return (
    <div className="Profile">
      <div className="profile-menu">
        <div>
          <img
            onClick={() => navigate("changeProfile")}
            src={currImage}
            className="profile-picture"
            alt=""
          />
          <img
            onClick={() => navigate("changeProfile")}
            src={require("../../../images/upload.png")}
            className="upload-img"
            alt=""
          />
        </div>
        <div className="profile-menu-options">
          <h2>{`${user?.first_name} ${user?.last_name}`}</h2>
          <div>
            <NavLink className="profile-nav" to="">
              My Profile
            </NavLink>
            <NavLink className="profile-nav" to="edit">
              Edit Account
            </NavLink>
            <NavLink className="profile-nav" to="delete">
              Delete Account
            </NavLink>
          </div>
        </div>
      </div>
      <div className="profile-details-container">
        <Routes>
          <Route path="/" element={<ProfileDetails />} />
          <Route path="/edit" element={<ProfileEdit />} />
          <Route path="/changeprofile" element={<ChangePicture />} />
          <Route path="/delete" element={<Login deletePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default Profile;
