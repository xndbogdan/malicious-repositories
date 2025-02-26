import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainReducer from "modules/main/store/MainSlice";
import userReducer from "modules/user/store/userSlice";
import gameReducer from "modules/game/store/GameSlice";
import chatReducer from "modules/chat/store/ChatSlice";
import usersReducer from "modules/users/store/usersSlice";

const rootReducer = combineReducers({
  main: mainReducer,
  user: userReducer,
  game: gameReducer,
  chat: chatReducer,
  users: usersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
