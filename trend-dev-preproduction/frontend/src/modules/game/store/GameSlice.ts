import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  opponent: null,
  gamePage: "",
  chat: false,
  fightSound: true,
};

export const GameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGamePage: (state, action) => {
      state.gamePage = action.payload;
    },
    setOpponent: (state, action) => {
      state.gamePage = "fight";
      state.opponent = action.payload;
    },
    setFightSound: (state) => {
      state.fightSound = !state.fightSound;
    },
  },
});

export const { setGamePage, setOpponent, setFightSound } = GameSlice.actions;

export default GameSlice.reducer;
