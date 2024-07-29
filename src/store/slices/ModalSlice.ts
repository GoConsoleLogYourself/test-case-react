import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  isOpen: boolean;
}
const initialState: InitialStateProps = {
  isOpen: false,
};

const ModalSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = ModalSlice.actions;
export default ModalSlice.reducer;
