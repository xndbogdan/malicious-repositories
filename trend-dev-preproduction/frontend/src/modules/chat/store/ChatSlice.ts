import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  chat: [],
  chatStatus: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
    },
    setChatStatus: (state) => {
      state.chatStatus = !state.chatStatus;
    },
  },
});

export const { setChat, setChatStatus } = chatSlice.actions;

export default chatSlice.reducer;
