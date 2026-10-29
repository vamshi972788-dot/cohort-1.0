import { useCallback } from 'react'
import useChatConversation from './useChatConversation.js'
import useChatList from './useChatList.js'

function useChats() {
  const chatList = useChatList()
  const conversation = useChatConversation(chatList.upsertChat)
  const {
    activeChat,
    clearError: clearConversationError,
    error: conversationError,
    isLoadingMessages,
    isSending,
    messages,
    selectChat: loadChat,
    sendMessage: sendChatMessage,
    startNewChat: resetConversation,
  } = conversation
  const {
    chats,
    clearError: clearChatError,
    error: chatListError,
    isLoadingChats,
    removeChat: deleteChat,
  } = chatList

  const selectChat = useCallback((chat) => {
    clearChatError()
    return loadChat(chat)
  }, [clearChatError, loadChat])

  const startNewChat = useCallback(() => {
    clearChatError()
    resetConversation()
  }, [clearChatError, resetConversation])

  const sendMessage = useCallback((message, search = false) => {
    clearChatError()
    return sendChatMessage(message, search)
  }, [clearChatError, sendChatMessage])

  const removeChat = useCallback(async (chatId) => {
    clearConversationError()
    const wasRemoved = await deleteChat(chatId)

    if (wasRemoved && activeChat?._id === chatId) {
      resetConversation()
    }
  }, [activeChat, clearConversationError, deleteChat, resetConversation])

  return {
    activeChat,
    chats,
    error: conversationError || chatListError,
    isLoadingChats,
    isLoadingMessages,
    isSending,
    messages,
    removeChat,
    selectChat,
    sendMessage,
    startNewChat,
  }
}

export default useChats
