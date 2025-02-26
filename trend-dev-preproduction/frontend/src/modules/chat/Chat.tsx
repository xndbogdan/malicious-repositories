import React, { FC, useEffect, useState } from "react";
import styles from "./Chat.module.scss";
import Input from "kit/input/Input";
import Button from "kit/button/Button";
import moment from "moment";
import localized from "helpers/localized";
import { RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchChat, fetchChats } from "./store/ChatAC";

const Chat: FC = () => {
  const dispatch = useDispatch();

  const [string, setString] = useState("");

  const chat = useSelector((state: RootState) => state.chat.chat);

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {chat.map((chat) => {
          return (
            <div className={styles.chat} key={chat._id}>
              <div className={styles.wrapper}>
                <div className={styles.name}>{chat.name}:</div>
                <div className={styles.message}>{chat.message}</div>
              </div>
              <div className={styles.time}>
                {moment(chat.time).format("HH:mm")}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.block}>
        <div className={styles.input}>
          <Input
            id="chat"
            value={string}
            label={localized.message}
            length={500}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setString(e);
            }}
          />
        </div>
        <div className={styles.button}>
          <Button
            onClick={() => {
              dispatch(fetchChat(string));
              setString();
            }}
          >
            {localized.send}
          </Button>
        </div>
        <div className={styles.button}>
          <Button
            onClick={() => {
              dispatch(fetchChats());
            }}
          >
            {localized.reload}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
