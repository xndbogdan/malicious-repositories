import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setlogin, setlogout, createUser } from "./actions";
import { getCookie, removeCookie, setCookie } from "../../utils/cookie";

const PREFIX = "auth";

let initLoginUser;
if (getCookie("username") && getCookie("username") !== "undefined") {
  initLoginUser = getCookie("username");
} else {
  initLoginUser = "";
}

const initialState: any = {
  username: initLoginUser,
  status: false,
  errorAuth: "",
  updateResponse: false
};

const setAuth = (state: any, res: any) => {
  if (res.success) {
    state.status = res.success;
    state.errorAuth = "";
    setCookie("username", res.data.username);
    setCookie("token", res.data.token);
    state.username = res.data.username;
  } else {
    state.status = res.success;
    state.errorAuth = res.error;
  }
  state.updateResponse = !state.updateResponse;
};

const setCreateUser = (state: any, res: any) => {
  if (res.success) {
    state.status = res.success;
    state.errorAuth = "";
  } else {
    state.status = res.success;
    state.errorAuth = res.error;
  }
  state.updateResponse = !state.updateResponse;
};

export const authReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    logout: state => {
      removeCookie("username");
      removeCookie("token");
      state.username = "";
    }
  },
  extraReducers: builder => {
    builder.addCase(
      setlogin.fulfilled.type,
      (state: any, action: PayloadAction<any>) => {
        setAuth(state, action.payload);
      }
    );
    builder.addCase(setlogout.fulfilled.type, (state: any) => {
      removeCookie("username");
      removeCookie("token");
      state.username = "";
    });
    builder.addCase(
      createUser.fulfilled.type,
      (state: any, action: PayloadAction<any>) => {
        setCreateUser(state, action.payload);
      }
    );
  }
});
export const { logout } = authReducer.actions;
export { setlogin, setlogout, createUser };
export default authReducer.reducer;
