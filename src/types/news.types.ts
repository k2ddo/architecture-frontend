export interface INewsResponse {
  title: string
  text?: string
  created_at: string
  updated_at: string
  media?: INewsMedia[]
  urls?: INewsUrl[]
}

export interface INewsMedia {
  media: string
  media_type: string
}

export interface INewsUrl {
  title: string
  url: string
}
