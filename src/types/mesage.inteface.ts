export interface ICreateMessage {
  chatId: string
  message: string
}

export interface IDataChatId {
  chatId: string
  count: number
}

export interface IFetchChats {
  archive: boolean,
  id: string,
  notSpam: boolean,
  ephemeralExpiration: number,
  ephemeralSettingTimestamp: number,
  mute: number,
  name: string
}

export interface IFetchMessage {
  type?: string,
  idMessage?: string,
  timestamp?: number,
  typeMessage?: string,
  chatId?: string,
  textMessage: string,
  extendedTextMessage?: IExtendedTextMessage,
  statusMessage?: string,
  sendByApi?: boolean

}
export interface IExtendedTextMessage {
  text: string,
  description: string,
  title: string,
  previewType: string,
  jpegThumbnail: string,
  forwardingScore: null,
  isForwarded: null
}