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
/*  const chatOne = '89635940930@c.us'
  const chatTwo = '89635940530@c.us'*/
/*  const filteredChats = chats?.filter(chat => chat.id === chatOne || chat.id === chatTwo ) //Оставил два чата, которые мне нужны*/

  return (
    <div className={styles.nav}>
      <ChatHeader/>
      <div className={styles.container}>
        {chats?.map(chat => <ChatList key={chat.id} chat={chat}/>)}
      </div>
    </div>
  );
};