import { useState, useEffect } from "react";
import { wait } from "./helper";

export const useMessageHook = (message) => {
  const [typeMessage, setTypeMessage] = useState("");

  useEffect(() => {
    let visableMessage = "";
    if (message.length) {
      (async () => {
        for (let i = 0; i < message.length; i++) {
          await wait(30);
          visableMessage = visableMessage + message[i];
          setTypeMessage(visableMessage);
        }
      })();
    }
  }, [message]);
  return [typeMessage];
};
