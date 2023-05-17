import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {MessageService} from "../services/message.service.ts";
import {ICreateMessage, IDataChatId} from "../types/mesage.inteface.ts";
import {useMemo} from "react";

export const useMessageQuery = (idInstance: string, apiTokenInstance: string, chatId?: string) => {
  const getChats = useQuery({
    queryFn: () => MessageService.fetchChats(idInstance, apiTokenInstance),
    queryKey: ['chats'],
  })

  const client = useQueryClient()

  const getMessages = useMutation({
    mutationFn: (data: IDataChatId) => MessageService.fetchMessages(data, idInstance, apiTokenInstance),
    // mutationKey: ['messages'],
  })

  // const useGetMessages = (data: IDataChatId, idInstance: string, apiTokenInstance: string) => {
  //   return useQuery({
  //     queryFn: async () => {
  //      const res = await MessageService.fetchMessages(data, idInstance, apiTokenInstance)
  //       return res
  //     },
  //     queryKey: ['message', chatId],
  //     refetchInterval: 5000,
  //   });
  // }

  const createMessage = useMutation({
    mutationFn: (data: ICreateMessage) => MessageService.createMessage(data, idInstance, apiTokenInstance),
    onSuccess: () => {
      client.invalidateQueries(['message', chatId])
    }
  })

  return useMemo(() => ({
    getMessages, createMessage, getChats
  }), [ getMessages, createMessage, getChats])

}