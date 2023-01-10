import { IconButton, InputBase, Paper, Slider } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import VacationModel from "../../../../../models/vacation-model";
import VacService from "../../../../../services/vacation-service";
import {
  categories,
  vacationActions as actions,
} from "../../../../../store/vacation-state";
import SortItem from "./SortItem/SortItem";
import service from "../../../../../services/vacation-service";
import "./HeaderFilters.css";

export enum SortOptions {
  start = "start",
  finish = "finish",
  destination = "destination",
  price = "price",
}

interface Props {
  onSort: Function;
}

function HeaderFilters(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const currCategory = useSelector((state: any) => state.vacations.category);
  const [order, setOrder] = useState<string>("ASC");
  const [sortBy, setSortBy] = useState<string>("start");
  const [userPrice, setPrice] = useState<any>(10000);
  const [userSearch, setUserSearch] = useState<string>("");

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

  const changeInput = (event: SyntheticEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setUserSearch(value);
  };

  const submitSearch = async (e: any) => {
    e.preventDefault();
    const userInput = upperCaseVacation(userSearch);
    const result = await service.getVacationByName(userInput);
    if (!result.length) return;
    const searched = result.filter((v) => v.destination === userInput);
    dispatch(
      actions.setVacations({
        vacations: searched,
        category: categories.SEARCHED,
      })
    );
    setUserSearch("");
  };

  const upperCaseVacation = (v: string) => {
    return v
      .split(" ")
      .map((u) => u[0].toUpperCase() + u.slice(1))
      .join(" ");
  };

  return (
    <div className="HeaderFilters">
      <div className="filter-search-container">
        <Paper
          component="form"
          className="filters-search"
          onSubmit={submitSearch}
        >
          <InputBase
            inputProps={{ maxLength: "20" }}
            onChange={changeInput}
            value={userSearch}
            className="filters-search-input"
            placeholder="find your vacation..."
          />
          <IconButton
            sx={{ height: "2rem", width: "2rem" }}
            onClick={submitSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div className="SortMenu">
        <div className="slider-container">
          <span>0$</span>
          <Slider
            style={{ margin: "0 0.6rem 0 0.3rem" }}
            value={userPrice}
            min={0}
            max={10000}
            valueLabelDisplay="auto"
            onChange={async (e: Event, val: number | number[]) => setPrice(val)}
            onMouseUp={mouseUp}
          />
          <span>10k$</span>
        </div>
        <div className="sort-items-container">
          <select
            className="sort-items-select"
            onChange={(e) => sortVacations(e.target.value)}
          >
            {Object.keys(SortOptions).map((s) => (
              <SortItem key={s} sortBy={s} />
            ))}
          </select>
          <img
            src={require(`../../../../../images/${order}.png`)}
            alt=""
            title={order === "ASC" ? "sort down" : "sort up"}
            onClick={changeOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderFilters;
