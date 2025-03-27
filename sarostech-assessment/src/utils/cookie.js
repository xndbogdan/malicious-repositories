import Cookies from "js-cookie";

export const setCookie = (cookiename, cookievalue) => {
  const expiryTime = 1; // 1 day
  const currentDate = new Date();
  const expires = new Date(
    currentDate.getTime() + expiryTime * 24 * 60 * 60 * 1000
  );
  Cookies.set(cookiename, cookievalue, { expires });
};

export const getCookie = (cookiename) => {
  const cookieData = Cookies.get(cookiename);
  return cookieData;
};

export const removeCookie = (cookiename) => {
  Cookies.remove(cookiename);
};
