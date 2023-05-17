import {FC, useEffect} from 'react';
import styles from './ChatRoom.module.scss';
import stylesInput from '../Input/InputWriteMessage.module.scss'
import {ChatRoomHeader} from "../Chat/ChatRoomHeader/ChatRoomHeader.tsx";
import {Input} from "../Input/Input.tsx";
import {MessageSubmitSVG} from "../SvgComponents.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {MessageItem} from "../MessageItem/MessageItem.tsx";
import {useMessageQuery} from "../../react-query/useMessageQuery.ts";
import {useParams} from "react-router-dom";
import {ICreateMessage} from "../../types/mesage.inteface.ts";

interface IChatRoomProps {
  idInstance: string
  apiTokenInstance: string
}

export const ChatRoom: FC<IChatRoomProps> = ({idInstance, apiTokenInstance}) => {
  const {id} = useParams()
  const {createMessage, getMessages} = useMessageQuery(idInstance, apiTokenInstance, id)

  const {mutate: fetchMessages, data: messages, isSuccess} = getMessages
  const {mutateAsync: create} = createMessage

  const {register, handleSubmit, formState: {errors}, reset} = useForm<ICreateMessage>({mode: 'onChange'})

  useEffect(() => {
    fetchMessages({chatId: id!, count: 100})
  }, [fetchMessages, id])

  console.log(messages)

  console.log(id, 'id')


  const onSubmit: SubmitHandler<ICreateMessage> = async (data) => {
    await create({chatId: id!, message: data.message})
    reset()
  }

  return (
    <div className={styles.wrapper}>

      <ChatRoomHeader name={id!}/>
      <div className={styles.messagesList} >
        {isSuccess && messages.map((message, i) => {
          return <MessageItem message={message}
                              key={message.idMessage ? message.idMessage : i}
          />
        })}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.writeMessage}>
          <div className={styles.container}>
            <Input {...register('message')
              } styles={stylesInput} />
            <button className={styles.btn}><MessageSubmitSVG/></button>
          </div>

        </div>
      </form>


    </div>
  );
};