import axios from 'axios'

export type Feed = {
	id: string
	// created_at: Date
	// updated_at: Date
	name: string
	url: string
	// user_id: string
}

export const fetchFeeds = async () => {
	console.log('Fetching posts...')
	await new Promise((r) => setTimeout(r, 500))
	return axios
		.get<Feed[]>('http://localhost:8000/v1/feeds')
		.then((r) => r.data)
}
