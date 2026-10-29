import { useCallback, useEffect, useState } from 'react'
import { deleteChat, getChats } from '../service/chat.api.js'
import getChatErrorMessage from '../utils/getChatErrorMessage.js'

function useChatList() {
  const [chats, setChats] = useState([])
  const [isLoadingChats, setIsLoadingChats] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadChats() {
      try {
        const response = await getChats()
        if (isMounted) {
          setChats((currentChats) => {
            const knownChatIds = new Set(currentChats.map((chat) => chat._id))
            return [
              ...currentChats,
              ...response.chats.filter((chat) => !knownChatIds.has(chat._id)),
            ]
          })
        }
      } catch (requestError) {
        if (isMounted) {
          setError(getChatErrorMessage(requestError, 'Could not load your chats.'))
        }
      } finally {
        if (isMounted) setIsLoadingChats(false)
      }
    }

    loadChats()

    return () => {
      isMounted = false
    }
  }, [])

  const upsertChat = useCallback((chat) => {
    setChats((currentChats) => [
      chat,
      ...currentChats.filter((currentChat) => currentChat._id !== chat._id),
    ])
  }, [])

  const clearError = useCallback(() => setError(''), [])

  const removeChat = useCallback(async (chatId) => {
    clearError()

    try {
      await deleteChat(chatId)
      setChats((currentChats) => currentChats.filter((chat) => chat._id !== chatId))
      return true
    } catch (requestError) {
      setError(getChatErrorMessage(requestError, 'Could not delete this chat.'))
      return false
    }
  }, [clearError])

  return {
    chats,
    clearError,
    error,
    isLoadingChats,
    removeChat,
    upsertChat,
  }
}

export default useChatList
