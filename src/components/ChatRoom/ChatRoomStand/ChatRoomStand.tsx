import {FC} from 'react';
import styles from './ChatRoomStand.module.scss';
import {ClearMainSVG} from "../../SvgComponents.tsx";

interface IChatRoomStandProps {
}

export const ChatRoomStand: FC<IChatRoomStandProps> = () => {
  return (
    <div className={styles.wrapper}>
      <ClearMainSVG />

      <div className={styles.infoContainer}>
        <span className={styles.title}>WhatsApp Web</span>
        <span className={styles.info}>
          Отправляйте и получайте сообщения без необходимости оставлять телефон подключённым. <br />
          Используйте WhatsApp одновременно на четырёх связанных устройствах и одном телефоне.
        </span>
      </div>
    </div>
  );
};