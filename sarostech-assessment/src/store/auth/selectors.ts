import type { RootState } from "../store";

export const selectLoginUser = (state: RootState) => state.auth.username;
export const selectErrorAuth = (state: RootState) => state.auth.errorAuth;
export const selectStatusAuth = (state: RootState) => state.auth.status;
export const selectUpdateResponseAuth = (state: RootState) =>
  state.auth.updateResponse;
