import {FC} from 'react';
import styles from './ChatRoomHeader.module.scss';
import {AvatarComponent} from "../AvatarComponent/AvatarComponent.tsx";

interface IChatRoomHeaderProps {
  name: string
}

export const ChatRoomHeader: FC<IChatRoomHeaderProps> = ({name}) => {
  return (
    <div className={styles.header}>
      <AvatarComponent />
      <div className={styles.user}>
        <span className={styles.name}>{name.slice(0,11)}</span>
      </div>
    </div>
  );
};