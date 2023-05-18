import axios from "axios";
import {ICreateMessage, IDataChatId, IFetchChats, IFetchMessage} from "../types/mesage.inteface.ts";
import {getContentType} from "../api/api.helper.ts";

export const axiosOptions = {
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    // baseURL: 'https://api.green-api.com',
    headers: getContentType()
}

export const instance = axios.create(axiosOptions)

export const MessageService =  {
    fetchMessages: async (data: IDataChatId,idInstance: string, apiTokenInstance: string) => {
        const res = await instance.post<IFetchMessage[]>(`/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`, data)

        return res.data
    },

    createMessage: async (data: ICreateMessage, idInstance: string, apiTokenInstance: string) => {
        const res = await instance.post<{ idMessage: string }>(`/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, data)

        return res.data
    },

    fetchChats: async (idInstance: string, apiTokenInstance: string) => {
        const res = await instance.get<IFetchChats[]>(`/waInstance${idInstance}/getChats/${apiTokenInstance}`)

        return res.data
    }
}