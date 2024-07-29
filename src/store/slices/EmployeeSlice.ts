import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";
import { IEmployee } from "../../models/IEmployee";

interface InitialStateProps {
  employeeList: IEmployee[];
}
const initialState: InitialStateProps = {
  employeeList: [],
};

const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee(state, action: PayloadAction<IEmployee[]>) {
      state.employeeList.push(...action.payload);
    },
    clearEmployeeList(state) {
      state.employeeList = [];
    },
  },
});

export const { addEmployee, clearEmployeeList } = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
