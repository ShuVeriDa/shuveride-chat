import {FC} from 'react';
import styles from './ChatList.module.scss';
import {AvatarComponent} from "../AvatarComponent/AvatarComponent.tsx";
import {IFetchChats} from "../../../types/mesage.inteface.ts";
import {useNavigate} from "react-router-dom";

interface IChatRoomListProps {
  chat:IFetchChats
}

export const ChatList: FC<IChatRoomListProps> = ({chat}) => {
  const navigate = useNavigate()
  const name = chat.name ? chat.name : chat.id.slice(0, 11)

  return (
    <div className={styles.wrapper}
         onClick={() => navigate(`/room/${chat.id}`)}
    >
      <div className={styles.container}>
        <AvatarComponent />
        <div className={styles.info}>
          <div className={styles.userInfo}>
            <span className={styles.name}>{name}</span>
          </div>
        </div>

      </div>

    </div>
  );
};