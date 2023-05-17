import {FC} from 'react';

import styles from './Nav.module.scss'
import {ChatList} from "../Chat/ChatList/ChatList.tsx";
import {ChatHeader} from "../Chat/ChatHeader/ChatHeader.tsx";
import {useMessageQuery} from "../../react-query/useMessageQuery.ts";

interface NavPropsType {
  idInstance: string
  apiTokenInstance: string
}

export const Nav: FC<NavPropsType> = ({idInstance, apiTokenInstance}) => {
  const {getChats} = useMessageQuery(idInstance, apiTokenInstance)
  const {data: chats} = getChats

  return (
    <div className={styles.nav}>
      <ChatHeader/>
      <div className={styles.container}>
        {chats?.map(chat => <ChatList key={chat.id} chat={chat}/>)}
      </div>
    </div>
  );
};