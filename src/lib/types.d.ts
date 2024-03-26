export type Feed = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  url: string
  userId: string
}

export type Post = {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: {
    String: string
    Valid: boolean
  }
  publishedAt: Date
  url: string
  thumbnailUrl: {
    String: string
    Valid: boolean
  }
  feedId: string
}

export type User = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  apiKey: string
}

export type Error = {
  error: string
}
