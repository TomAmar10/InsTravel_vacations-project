import UserModel, { Role } from "../../../../../models/user-model";
import Button from "../../../../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { vacationActions } from "../../../../../store/vacation-state";
import VacationModel from "../../../../../models/vacation-model";
import { categories } from "../../../../../store/vacation-state";
import VacService from "../../../../../services/vacation-service";
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

  const toggle = async (category: string) => {
    let sorted = await VacService.getSorted(user.id, props.sortBy, "ASC");
    if (category === categories.FOLLOWED) {
      sorted = sorted.data.filter((v: VacationModel) => v.follower_id);
    } else sorted = sorted.data;
    dispatch(
      vacationActions.setVacations({
        vacations: sorted,
        category: category,
      })
    );
  };

  return (
    <div className="HomeNavigator">
      <div></div>
      <h2>
        {category === categories.ALL && "Vacations around the world"}
        {category === categories.FOLLOWED && "My vacations"}
        {category === categories.SEARCHED &&
          `Vacations at ${vacations[0].destination}`}
      </h2>
      <div>
        {category === categories.ALL ? (
          user.role === Role.User && (
            <Button
              value="my vacations"
              onClick={() => toggle(categories.FOLLOWED)}
            />
          )
        ) : (
          <Button value="Home" onClick={() => toggle(categories.ALL)} />
        )}
      </div>
    </div>
  );
}

export default HomeNavigator;
