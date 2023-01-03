import { createSlice } from "@reduxjs/toolkit";
import VacationModel from "../models/vacation-model";

export enum categories {
  ALL = "all",
  FOLLOWED = "followed",
  SEARCHED = "searched",
}

interface VacationState {
  vacations: VacationModel[];
  category: categories;
}

const initialVacationState: VacationState = {
  vacations: [],
  category: categories.ALL,
};

const vacationSlice = createSlice({
  name: "vacations",
  initialState: initialVacationState,
  reducers: {
    setVacations(state, action) {
      state.vacations = action.payload.vacations;
      if (action.payload.category) {
        state.category = action.payload.category;
        return;
      }
      state.category = categories.ALL;
    },
  },
});

export const vacationActions = vacationSlice.actions;
export default vacationSlice.reducer;
