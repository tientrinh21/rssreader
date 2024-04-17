import axios from 'axios'
import type { Feed, Post, User } from './types'

// Local dev
// const URL = 'http://localhost:8000/'

// Production
const URL = 'https://rssagg.onrender.com/'

/** USER **/
export const fetchUser = async (apiKey: string) => {
  console.log('Loging in...')
  return axios
    .get<User>(`${URL}v1/users`, {
      headers: {
        Authorization: `ApiKey ${apiKey}`
      }
    })
    .then((r) => r.data)
}

export const createUser = async (name: string) => {
  console.log('Creating new user...')
  return axios
    .post<User>(`${URL}v1/users`, { name: name })
    .then((r) => r.data)
}

/** FEED **/
export const fetchFeeds = async () => {
  console.log('Fetching feeds...')
  await new Promise((r) => setTimeout(r, 500)) // Delay for slow Internet simulation
  return axios
    .get<Feed[]>(`${URL}v1/feeds`)
    .then((r) => r.data)
}

export const createFeed = async (apiKey: string, data: { name: string, url: string }) => {
  console.log(`Creating feed ${data.name}...`)
  return axios
    .post<Feed>(`${URL}v1/feeds`, data, {
      headers: {
        Authorization: `ApiKey ${apiKey}`
      }
    })
    .then((r) => r.data)
}

/** POSTS **/
export const fetchPosts = async (feedId: string) => {
  console.log(`Fetching posts with feed id ${feedId}...`)
  await new Promise((r) => setTimeout(r, 1000)) // Delay for slow Internet simulation
  return axios
    .get<Post[]>(`${URL}v1/feeds/${feedId}`)
    .then((r) => r.data)
}
