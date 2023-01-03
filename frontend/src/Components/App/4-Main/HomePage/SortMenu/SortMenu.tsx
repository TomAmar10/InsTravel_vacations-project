import { Slider } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VacationModel from "../../../../../models/vacation-model";
import VacService from "../../../../../services/vacation-service";
import {
  categories,
  vacationActions as actions,
} from "../../../../../store/vacation-state";
import SortItem from "./SortItem/SortItem";
import "./SortMenu.css";

export enum SortOptions {
  start = "start",
  finish = "finish",
  destination = "destination",
  price = "price",
}

interface Props {
  onSort: Function;
}

function SortMenu(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const currCategory = useSelector((state: any) => state.vacations.category);
  const [order, setOrder] = useState<string>("ASC");
  const [sortBy, setSortBy] = useState<string>("start");
  const [userPrice, setPrice] = useState<any>(10000);

  const sortVacations = async (newSortBy = sortBy, newOrder = order) => {
    props.onSort(newSortBy);
    setSortBy(newSortBy);
    const sorted = await VacService.getSorted(user.id, newSortBy, newOrder);
    if (currCategory === "followed") {
      dispatch(
        actions.setVacations({
          vacations: sorted.data.filter((v: VacationModel) => v.follower_id),
          category: categories.FOLLOWED,
        })
      );
      return;
    }
    dispatch(
      actions.setVacations({
        vacations: sorted.data,
        category: currCategory,
      })
    );
  };

  const changeOrder = async () => {
    const newOrder = order === "ASC" ? "DESC" : "ASC";
    sortVacations(sortBy, newOrder);
    setOrder(newOrder);
  };

  const mouseUp = async () => {
    const res = await VacService.getMaxPrice(user.id, userPrice, sortBy, order);
    if (res.status === 200) {
      dispatch(
        actions.setVacations({ vacations: res.data, category: currCategory })
      );
      return;
    }
    dispatch(actions.setVacations({ vacations: [], category: currCategory }));
  };

  return (
    <div className="SortMenu-container">
      <div className="SortMenu">
        <div className="sort-menu-buttons">
          {Object.keys(SortOptions).map((s) => (
            <SortItem key={s} onSort={sortVacations} sortBy={s} />
          ))}
        </div>
        <div className="SortItem">
          <span>0$</span>
          <Slider
            style={{ width: "15rem", margin: "0 1.2rem 0 0.8rem" }}
            value={userPrice}
            min={0}
            max={10000}
            valueLabelDisplay="auto"
            onChange={async (e: Event, val: number | number[]) => setPrice(val)}
            onMouseUp={mouseUp}
          />
          <span>10,000$</span>
        </div>
        <img
          src={require(`../../../../../images/${order}.png`)}
          alt=""
          title={order === "ASC" ? "sort down" : "sort up"}
          onClick={changeOrder}
        />
      </div>
    </div>
  );
}

export default SortMenu;
