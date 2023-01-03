import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../../models/vacation-model";
import Button from "../../../UI/Button/Button";
import VacationBox from "./VacationBox/VacationBox";
import UserModel, { Role } from "../../../../models/user-model";
import VacService from "../../../../services/vacation-service";
import { Pagination, Stack } from "@mui/material";
import SortMenu from "./SortMenu/SortMenu";
import HomeNavigator from "./HomeNavigator/HomeNavigator";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../UI/Spinner/Spinner";
import { vacationActions } from "../../../../store/vacation-state";
import { categories } from "../../../../store/vacation-state";
import { userActions } from "../../../../store/user-state";
import Modal from "./Modal/Modal";
import "./HomePage.css";

function HomePage(): JSX.Element {
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state: any) => state.modal.isVisible);
  const allVacations: VacationModel[] = useSelector(
    (state: any) => state.vacations.vacations
  );
  const user: UserModel = useSelector((state: any) => state.user.user);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("start");
  const [error, setError] = useState<string>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setError(undefined);
    showAll().then(() => {
      if (user.id < 1) {
        const userToken = localStorage.getItem("userToken");
        if (userToken) dispatch(userActions.login(userToken));
      }
    });
  }, [user]);

  const showAll = async () => {
    const result = await VacService.getSorted(user.id, "start", "ASC");
    if (result.status === 200) {
      dispatch(
        vacationActions.setVacations({
          vacations: result.data,
          category: categories.ALL,
        })
      );
    } else {
      user.role === Role.Admin
        ? setError(result.data.msg)
        : setError("something went wrong, please try again later");
    }
    setIsLoading(false);
  };

  return (
    <div className="HomePage">
      {allVacations && <SortMenu onSort={(newS: string) => setSortBy(newS)} />}
      <HomeNavigator sortBy={sortBy} />
      <div className="pagination-area">
        {allVacations && Math.ceil(allVacations.length / 10) > 1 && (
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(allVacations.length / 10)}
              page={page}
              onChange={(event: any, value: number) => setPage(value)}
            />
          </Stack>
        )}
      </div>
      <div className="homepage-main-area flow">
        <div className="vacations-container">
          {isLoading && <Spinner />}
          {!isLoading && allVacations.length > 0 ? (
            allVacations
              ?.slice((page - 1) * 10, page * 10)
              ?.map((vacation) => (
                <VacationBox vacation={vacation} key={vacation.id} />
              ))
          ) : (
            <div>{error ? error : "no vacations to show"}</div>
          )}
        </div>
      </div>
      {user.role === Role.Admin && (
        <NavLink to={"/vacation/add"}>
          <Button value="add vacation" />
        </NavLink>
      )}
      {isModalVisible && <Modal onDelete={showAll} />}
    </div>
  );
}

export default HomePage;

// const handleSort = (event: any, newSort: string) => {
//   switch (newSort) {
//     case "start":
//       dispatch(
//         vacationActions.setVacations(
//           allVacations.sort((a, b) =>
//             a.start > b.start ? 1 : b.start > a.start ? -1 : 0
//           )
//         )
//       );

//       break;
//     case "price":
//       dispatch(
//         vacationActions.setVacations(
//           allVacations.sort((a, b) =>
//             a.price > b.price ? 1 : b.price > a.price ? -1 : 0
//           )
//         )
//       );
//       break;
//     case "destination":
//       dispatch(
//         vacationActions.setVacations(
//           allVacations.sort((a, b) =>
//             a.destination > b.destination
//               ? 1
//               : b.destination > a.destination
//               ? -1
//               : 0
//           )
//         )
//       );
//   }
// };
