import {FC} from 'react';
import {Outlet, useLocation} from "react-router-dom";

import styles from './MainLayout.module.scss'

import {Nav} from "../components/Nav/Nav";
import {ChatRoomStand} from "../components/ChatRoom/ChatRoomStand/ChatRoomStand.tsx";
import {LogoutSVG} from "../components/SvgComponents.tsx";

interface MainLayoutPropsType {
  idInstance: string
  apiTokenInstance: string
  handleLogout: () => void
}

export const MainLayout: FC<MainLayoutPropsType> = ({idInstance, apiTokenInstance, handleLogout}) => {
  const {pathname} = useLocation()

  return (
    <div className={styles.wrapper}>
      <div className={styles.logout}><LogoutSVG onClick={handleLogout}/></div>
      <div className={styles.content}>
        <Nav idInstance={idInstance}
             apiTokenInstance={apiTokenInstance}
        />
        {pathname === '/'
          ? <ChatRoomStand/>
          : <Outlet/>
        }
      </div>

    </div>
  );
};