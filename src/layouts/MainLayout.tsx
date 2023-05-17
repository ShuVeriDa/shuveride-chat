import {FC} from 'react';
import {Outlet, useLocation} from "react-router-dom";

import styles from './MainLayout.module.scss'

import {Nav} from "../components/Nav/Nav";
import {ChatRoomStand} from "../components/ChatRoom/ChatRoomStand/ChatRoomStand.tsx";

interface MainLayoutPropsType {
  idInstance: string
apiTokenInstance: string
}

export const MainLayout: FC<MainLayoutPropsType> = ({idInstance, apiTokenInstance}) => {
  const {pathname} = useLocation()

  return (
    <div className={styles.wrapper}>


      <div className={styles.content}>
        <Nav idInstance={idInstance}
             apiTokenInstance={apiTokenInstance}/>
        {pathname === '/'
          ? <ChatRoomStand />
          : <Outlet />
        }
      </div>

    </div>
  );
};