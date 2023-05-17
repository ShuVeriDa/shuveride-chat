import {FC, useEffect, useState} from 'react';
import styles from './ChatRoom.module.scss';
import stylesInput from '../Input/InputWriteMessage.module.scss'
import {ChatRoomHeader} from "../Chat/ChatRoomHeader/ChatRoomHeader.tsx";
import {Input} from "../Input/Input.tsx";
import {MessageSubmitSVG} from "../SvgComponents.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {MessageItem} from "../MessageItem/MessageItem.tsx";
import {useMessageQuery} from "../../react-query/useMessageQuery.ts";
import {useParams} from "react-router-dom";
import {ICreateMessage, IFetchMessage} from "../../types/mesage.inteface.ts";
import {MessageService} from "../../services/message.service.ts";

interface IChatRoomProps {
  idInstance: string
  apiTokenInstance: string
}

export const ChatRoom: FC<IChatRoomProps> = ({idInstance, apiTokenInstance}) => {
  const {id} = useParams()
  const {createMessage} = useMessageQuery(idInstance, apiTokenInstance, id)

  const {mutateAsync: create} = createMessage

  const {register, handleSubmit, formState: {errors}, reset} = useForm<ICreateMessage>({mode: 'onChange'})

  // const { data: messages } = useGetMessages({ chatId: id!, count: 100 }, idInstance, apiTokenInstance);

  const [messages, setMessages] = useState<IFetchMessage[]>([])

  const fetchMessages = async () => {
    const res = await MessageService.fetchMessages({chatId: id!, count: 100}, idInstance, apiTokenInstance)
    setMessages(res)
  }

  useEffect(() => {
    fetchMessages()
  }, [id])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [messages]);


  const onSubmit: SubmitHandler<ICreateMessage> = async (data) => {
    setMessages(prev => [{textMessage: data.message}, ...prev])
    await create({chatId: id!, message: data.message})

    setTimeout(() => {
      fetchMessages()
    }, 5000)
    reset()
  }

  return (
    <div className={styles.wrapper}>
      <ChatRoomHeader name={id!}/>
      <div className={styles.messagesList}>
        {messages?.map((message, i) => {
          return <MessageItem message={message}
                              key={message.idMessage ? message.idMessage : i}

          />
        })}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.writeMessage}>
          <div className={styles.container}>
            <Input {...register('message')}
                   error={errors.message}
                   styles={stylesInput}
            />
            <button className={styles.btn}><MessageSubmitSVG/></button>
          </div>
        </div>
      </form>
    </div>
  );
};