import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getChannels } from "./actions";

const PREFIX = "chat";

const initialState = {
  channels: []
};

const setChannels = (state: any, res: any) => {
  if (res.success) {
    state.channels = res.data;
  } else {
    state.channels = [];
  }
};

export const chatReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      getChannels.fulfilled.type,
      (state: any, action: PayloadAction<any>) => {
        setChannels(state, action.payload);
      }
    );
  }
});

export { getChannels };

export default chatReducer.reducer;
