import { Provider } from "react-redux";
import { setupStore } from "./store";
import { FC } from "react";

const store = setupStore();

export const Providers: FC<any> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
