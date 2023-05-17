import {useMemo} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {MessageService} from "../services/message.service.ts";
import {ICreateMessage, IDataChatId} from "../types/mesage.inteface.ts";

export const useMessageQuery = (idInstance: string, apiTokenInstance: string, chatId?: string) => {
  const getChats = useQuery({
    queryFn: () => MessageService.fetchChats(idInstance, apiTokenInstance),
    queryKey: ['chats'],
  })


  const client = useQueryClient()

  const getMessages = useMutation({
    mutationFn: (data: IDataChatId) => MessageService.fetchMessages(data, idInstance, apiTokenInstance),
    onSuccess: () => {
      client.invalidateQueries(['message', chatId])
    }
  })

  const useGetMessages = (data: IDataChatId, idInstance: string, apiTokenInstance: string) => {
    return useQuery({
      queryFn: () => MessageService.fetchMessages(data, idInstance, apiTokenInstance),
      queryKey: ['message', data.chatId],
    });
  }

  const createMessage = useMutation({
    mutationFn: (data: ICreateMessage) => MessageService.createMessage(data, idInstance, apiTokenInstance),
    onSuccess: () => {
      client.invalidateQueries(['message', chatId])
    }
  })

  return useMemo(() => ({
    useGetMessages,
    getChats,
    getMessages,
    createMessage,

  }), [useGetMessages, getChats, getMessages, createMessage,])
}