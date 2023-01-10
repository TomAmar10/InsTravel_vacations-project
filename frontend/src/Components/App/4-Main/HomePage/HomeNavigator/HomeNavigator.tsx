import UserModel from "../../../../../models/user-model";
import { useDispatch, useSelector } from "react-redux";
import VacationModel from "../../../../../models/vacation-model";
import { categories } from "../../../../../store/vacation-state";
import "./HomeNavigator.css";

interface Props {
  sortBy: string;
}

function HomeNavigator(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const category = useSelector((state: any) => state.vacations.category);
  const user: UserModel = useSelector((state: any) => state.user.user);
  const vacations: VacationModel[] = useSelector(
    (state: any) => state.vacations.vacations
  );

  return (
    <div className="HomeNavigator">
      <h2>
        {category === categories.ALL && "All Vacations"}
        {category === categories.FOLLOWED && "My vacations"}
        {category === categories.SEARCHED &&
          `Vacations at ${vacations[0].destination}`}
      </h2>
    </div>
  );
}

export default HomeNavigator;
