import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const searchFiles = async (pattern: string) => {
  const { data } = await api.post('/api/v1/search', { pattern })
  return data
} 