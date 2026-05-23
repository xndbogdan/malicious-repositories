import dayjs from "dayjs";

export function padZero(number) {
  return number < 10 ? `0${number}` : number.toString();
}

export function dayjsToString(date) {
  return `${date?.$y}-${String(date?.$M + 1).padStart(2, "0")}-${String(
    date?.$D
  ).padStart(2, "0")} ${String(date?.$H).padStart(2, "0")}:${String(
    date?.$m
  ).padStart(2, "0")}:${String(date?.$s).padStart(2, "0")}`;
}

export function formatDate(dateString) {
  const formattedDate = dayjs(dateString);
  return formattedDate;
}

export function isImageData(data) {
  return /^data:image\/.*;base64,/.test(data);
}

export function getKeysWithTrueValues(obj) {
  return Object.keys(obj).filter(key => obj[key] === true);
}

export function extractIPsFromString(inputString) {
    const ipAddressRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;
    return inputString.match(ipAddressRegex);
}