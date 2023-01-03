import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Role } from "../../../../models/user-model";
import service from "../../../../services/vacation-service";
import Button from "../../../UI/Button/Button";
import Spinner from "../../../UI/Spinner/Spinner";
import VacationForm from "../VacationForm/VacationForm";
import "./AdminPage.css";

function Profile(): JSX.Element {
  const user = useSelector((state: any) => state.user.user);
  const [data, setData] = useState<{}[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id && user.role !== Role.Admin) {
      navigate("/homepage");
      return;
    }

    service
      .getFollowedVacations()
      .then((res) => {
        const newData = res.map((d: any) => {
          return { name: d.destination, pv: d.followers, price: d.price };
        });
        setData(newData);
      })
      .then((res) => setIsLoading(false));
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].value} followers`}</p>
          <p className="label">{`price : ${payload[0].payload.price}$`}</p>
        </div>
      );
    }
    return null;
  };

  const showVacation = (data: any) => {
    console.log(data);
  };

  return (
    <div className="AdminPage">
      <h1>Admin Reports</h1>
      {isLoading && <Spinner />}
      {!isLoading &&
        (data.length ? (
          <div className="bar-chart-container">
            <span>Followed vacations</span>
            <BarChart
              width={1000}
              height={300}
              data={data}
              margin={{ right: 20, left: 20, top: 20 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={CustomTooltip}
                wrapperStyle={{
                  fontSize: "0.8rem",
                  padding: "0.2rem",
                  border: "1px black solid",
                  backgroundColor: "rgb(173, 216, 230, 0.7)",
                  borderRadius: "10px",
                }}
              />
              <Bar
                dataKey="pv"
                stackId="a"
                fill="rgb(47, 47, 154)"
                barSize={50}
                onClick={() => showVacation(data)}
              />
            </BarChart>
          </div>
        ) : (
          <div>No vacations to show</div>
        ))}
      <div>
        {isVisible ? (
          <div className="admin-form-container">
            <VacationForm />
          </div>
        ) : (
          <Button value="add vacation" onClick={() => setIsVisible(true)} />
        )}
      </div>
    </div>
  );
}

export default Profile;
