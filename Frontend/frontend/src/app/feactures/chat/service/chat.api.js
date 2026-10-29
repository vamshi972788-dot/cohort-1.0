import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

export async function getChats() {
  const response = await api.get('/api/chats')
  return response.data
}

export async function getChatMessages(chatId) {
  const response = await api.get(`/api/chats/${chatId}/messages`)
  return response.data
}

export async function sendChatMessage(message, chatId, search = false) {
  const response = await api.post('/api/chats/message', { message, chat: chatId, search })
  return response.data
}

export async function deleteChat(chatId) {
  const response = await api.delete(`/api/chats/delete/${chatId}`)
  return response.data
}
