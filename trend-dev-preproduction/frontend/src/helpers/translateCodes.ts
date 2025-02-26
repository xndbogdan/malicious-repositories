import localized from "./localized";

export const translateCodes = (code) => {
  switch (code) {
    case "USER_NOT_FOUND":
      return localized.USER_NOT_FOUND;
    case "BAD_PASSWORD":
      return localized.BAD_PASSWORD;
    case "USER_ALREADY_REGISTERED":
      return localized.USER_ALREADY_REGISTERED;
    case "OTHER_DATA":
      return localized.OTHER_DATA;
    case "REG_ERROR":
      return localized.REG_ERROR;
    case "LOGIN_ERROR":
      return localized.LOGIN_ERROR;
    case "USER_ERROR":
      return localized.USER_ERROR;
    case "USERS_ERROR":
      return localized.USERS_ERROR;
    case "LOCATION_ERROR":
      return localized.LOCATION_ERROR;
    case "QUEST_ERROR":
      return localized.QUEST_ERROR;
    case "LANG_ERROR":
      return localized.LANG_ERROR;
    case "EXP_ERROR":
      return localized.EXP_ERROR;
    case "CHAT_ERROR":
      return localized.CHAT_ERROR;
    case "CHATS_ERROR":
      return localized.CHATS_ERROR;
    case "SUGGEST_ERROR":
      return localized.SUGGEST_ERROR;
    case "PROBLEM_ERROR":
      return localized.PROBLEM_ERROR;

    default:
      return "";
  }
};
