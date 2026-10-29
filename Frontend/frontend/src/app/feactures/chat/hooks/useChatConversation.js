import { useCallback, useRef, useState } from 'react'
import { getChatMessages, sendChatMessage } from '../service/chat.api.js'
import getChatErrorMessage from '../utils/getChatErrorMessage.js'

function useChatConversation(onChatSaved) {
  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')
  const selectionVersion = useRef(0)
  const messageRequestVersion = useRef(0)

  const clearError = useCallback(() => setError(''), [])

  const selectChat = useCallback(async (chat) => {
    const requestVersion = ++messageRequestVersion.current
    selectionVersion.current += 1
    setActiveChat(chat)
    setMessages([])
    setError('')
    setIsLoadingMessages(true)

    try {
      const response = await getChatMessages(chat._id)
      if (requestVersion === messageRequestVersion.current) {
        setMessages(response.messages)
      }
    } catch (requestError) {
      if (requestVersion === messageRequestVersion.current) {
        setError(getChatErrorMessage(requestError, 'Could not load messages for this chat.'))
      }
    } finally {
      if (requestVersion === messageRequestVersion.current) {
        setIsLoadingMessages(false)
      }
    }
  }, [])

  const startNewChat = useCallback(() => {
    selectionVersion.current += 1
    messageRequestVersion.current += 1
    setActiveChat(null)
    setMessages([])
    setError('')
    setIsLoadingMessages(false)
  }, [])

  const sendMessage = useCallback(async (message, search = false) => {
    const selectedChat = activeChat
    const selectionAtSend = selectionVersion.current
    setIsSending(true)
    setError('')

    try {
      const response = await sendChatMessage(message, selectedChat?._id, search)
      onChatSaved(response.chat)

      if (selectionAtSend === selectionVersion.current) {
        setActiveChat(response.chat)
        setMessages((currentMessages) => [...currentMessages, ...response.messages])
      }

      return true
    } catch (requestError) {
      setError(getChatErrorMessage(requestError, 'Could not send your message.'))
      return false
    } finally {
      setIsSending(false)
    }
  }, [activeChat, onChatSaved])

  return {
    activeChat,
    clearError,
    error,
    isLoadingMessages,
    isSending,
    messages,
    selectChat,
    sendMessage,
    startNewChat,
  }
}

export default useChatConversation
