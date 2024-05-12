export interface INotionPage {
  object: string
  id: string
  createdTime: string
  lastEditedTime: string
  createdBy: IUser
  lastEditedBy: IUser
  cover: null // 詳細な型が必要な場合は適宜変更してください
  icon: null // 詳細な型が必要な場合は適宜変更してください
  parent: IParent
  archived: boolean
  inTrash: boolean
  properties: {
    shubetsu: ISelectProperty
    hizuke: IDateProperty
    namae: ITitleProperty
  }
  url: string
  publicUrl: null | string
}

interface IUser {
  object: string
  id: string
}

interface IParent {
  type: string
  databaseId: string
}

interface ISelectProperty {
  id: string
  type: string
  select: {
    id: string
    name: string
    color: string
  }
}

interface IDateProperty {
  id: string
  type: string
  date: {
    start: string
    end: null | string
    timeZone: null | string
  }
}

interface ITitleProperty {
  id: string
  type: string
  title: IText[]
}

interface IText {
  type: string
  text: {
    content: string
    link: null | string
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plainText: string
  href: null | string
}
export interface INotionSearchResult {
  object: string
  results: INotionPage[]
  nextCursor: null | string
  hasMore: boolean
  type: string
  pageOrDatabase: object
  requestId: string
}
