import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setUser } from '../../auth/auth.slice.js'
import { logout } from '../../auth/services/auth.api.js'
import ChatComposer from '../components/ChatComposer.jsx'
import ChatHeader from '../components/ChatHeader.jsx'
import ChatMessage from '../components/ChatMessage.jsx'
import ChatSidebar from '../components/ChatSidebar.jsx'
import useChats from '../hooks/useChats.js'

function Dashboard() {
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [draft, setDraft] = useState('')
  const [isDark, setIsDark] = useState(() => localStorage.getItem('chat-theme') === 'dark')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const {
    activeChat,
    chats,
    error,
    isLoadingChats,
    isLoadingMessages,
    isSending,
    messages,
    removeChat,
    selectChat,
    sendMessage,
    startNewChat,
  } = useChats()

  function toggleTheme() {
    setIsDark((currentMode) => {
      const nextMode = !currentMode
      localStorage.setItem('chat-theme', nextMode ? 'dark' : 'light')
      return nextMode
    })
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  function toggleSidebar() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      setIsSidebarCollapsed((collapsed) => !collapsed)
      return
    }

    setIsSidebarOpen((open) => !open)
  }

  async function handleSend(event) {
    event.preventDefault()
    const message = draft.trim()
    if (!message || isSending || isLoadingMessages) return

    if (await sendMessage(message, isSearchMode)) {
      setDraft('')
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true)
    setLogoutError('')

    try {
      await logout()
      dispatch(setUser(null))
      navigate('/login', { replace: true })
    } catch (error) {
      setLogoutError(error.response?.data?.message || 'Could not log out. Please try again.')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <main className={`flex h-dvh min-h-0 overflow-hidden text-slate-800 dark:text-slate-100 ${isDark ? 'dark bg-[#111315]' : 'bg-[#fcfcfb]'}`}>
      <ChatSidebar
        activeChatId={activeChat?._id}
        chats={chats}
        isCollapsed={isSidebarCollapsed}
        isLoading={isLoadingChats}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        onDeleteChat={removeChat}
        onLogout={handleLogout}
        onNewChat={startNewChat}
        onSelectChat={selectChat}
        onToggleCollapse={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
        isLoggingOut={isLoggingOut}
        user={user}
      />

      <section className="flex min-w-0 flex-1 flex-col bg-[#fcfcfb] dark:bg-[#111315]">
        <ChatHeader
          isDark={isDark}
          onToggleSidebar={toggleSidebar}
          onToggleTheme={toggleTheme}
          title={activeChat?.title}
        />

        <div className={`flex min-h-0 flex-1 flex-col px-5 py-8 ${messages.length || isLoadingMessages ? 'justify-end' : 'justify-center'}`}>
          <div className="mx-auto flex min-h-0 w-full max-w-xl flex-1 flex-col">
            {messages.length === 0 && !isLoadingMessages ? (
              <div className="my-auto">
                <p className="mb-3 text-sm font-medium text-[#168b98]">Perplexity</p>
                <h1 className="mb-6 text-3xl font-semibold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl">
                  What do you want to know?
                </h1>
              </div>
            ) : (
              <div className="scrollbar-hidden mb-6 min-h-0 flex-1 overflow-y-auto">
                {isLoadingMessages ? (
                  <p className="py-4 text-center text-sm text-slate-400">Loading messages...</p>
                ) : (
                  messages.map((message) => (
                    <ChatMessage key={message._id} message={message} />
                  ))
                )}
              </div>
            )}

            {(error || logoutError) && (
              <p role="alert" className="mb-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {logoutError || error}
              </p>
            )}

            <ChatComposer
              draft={draft}
              isDisabled={isSending || isLoadingMessages}
              isSearchMode={isSearchMode}
              isSending={isSending}
              onDraftChange={setDraft}
              onSearchModeChange={() => setIsSearchMode((currentMode) => !currentMode)}
              onSubmit={handleSend}
            />
            <p className="mt-4 text-center text-xs text-slate-400">
              {isSending ? 'Waiting for a response...' : 'AI responses may not always be accurate'}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Dashboard
