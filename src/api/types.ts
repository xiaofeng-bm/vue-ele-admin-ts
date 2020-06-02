export interface Super {
  [propName: string]: any
}

export interface IArticalData {
  id: number
  hosCode: string 
  hosName: string 
  level: string
  province: string
  city: string
}

export interface IConfig {
  config: object[],
  table: object[]
}

export interface IResponse {
  code: number,
  [propName:string]: any
}