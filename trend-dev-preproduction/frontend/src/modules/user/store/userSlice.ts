import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLocation: (state, action) => {
      state.user.location = action.payload.location;
    },
    setLang: (state, action) => {
      state.user.lang = action.payload;
    },
  },
});

export const { setUser, setLocation, setLang } = userSlice.actions;

export default userSlice.reducer;
