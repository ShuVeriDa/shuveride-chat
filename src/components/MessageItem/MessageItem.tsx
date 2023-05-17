import {FC} from 'react';
import styles from './MessageItem.module.scss';
import {IFetchMessage} from "../../types/mesage.inteface.ts";

interface IMessageItemProps {
  message: IFetchMessage
}

export const MessageItem: FC<IMessageItemProps> = ({message}) => {
  const date = new Date(message.timestamp * 1000);
  const createdAt =`${date.getHours()}:${date.getMinutes()}`
  return (
    <div className={styles.wrapper} style={message.type === 'incoming' ? {justifyContent: 'left'} : {}}>
      <div className={styles.container} style={message.type === 'incoming' ? {background: "#fff"} : {}}>
        <span className={styles.message}>{message.textMessage}</span>
        <div className={styles.time}> <span>{createdAt}</span></div>
      </div>

    </div>
  );
};