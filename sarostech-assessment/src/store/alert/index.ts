import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { showAlert } from "./actions";
import type { alertState } from "./types";

const PREFIX = "alert";

const initialState: alertState = {
  message: "",
  severity: "success",
};

export const alertReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    updateAlert: (state: alertState, action: PayloadAction<any>) => {
      if (action.payload !== null) {
        state.message = action.payload.message;
        state.severity = action.payload.severity;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      showAlert.fulfilled.type,
      (state: alertState, action: PayloadAction<any>) => {
        state.message = action.payload.message;
        state.severity = action.payload.severity;
      }
    );
  },
});

export const { updateAlert } = alertReducer.actions;

export { showAlert };

export default alertReducer.reducer;
