import Icon from './Icon.jsx'

function ChatSidebar({
  activeChatId,
  chats,
  isCollapsed,
  isLoading,
  isOpen,
  onClose,
  onDeleteChat,
  onLogout,
  onNewChat,
  onSelectChat,
  onToggleCollapse,
  isLoggingOut,
  user,
}) {
  const displayName = user?.username || user?.email || 'Guest'

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-80 flex-col border-r border-slate-200 bg-[#f8f9f8] text-slate-800 transition-[width,transform] duration-200 dark:border-slate-800 dark:bg-[#17191b] dark:text-slate-100 md:static md:z-auto md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'md:w-16' : 'md:w-72'}`}
      >
        <div className={`flex h-16 items-center ${isCollapsed ? 'justify-center' : 'justify-between px-4'}`}>
          <span className="flex items-center gap-2.5 font-semibold">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#20b8cd] font-bold text-[#101414]">
              p
            </span>
            <span className={isCollapsed ? 'md:hidden' : ''}>Perplexity</span>
          </span>

          <button
            type="button"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={onToggleCollapse}
            className="hidden rounded-lg p-2 text-slate-500 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 md:block"
          >
            {/* <Icon name="panel" className="h-4 w-4" /> */}
          </button>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <div className="px-3 pt-2">
          <button
            type="button"
            onClick={() => {
              onNewChat()
              onClose()
            }}
            title="New Chat"
            className={`flex w-full items-center gap-2.5 rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:bg-[#222528] dark:text-slate-100 dark:hover:bg-slate-800 ${
              isCollapsed ? 'justify-center px-2' : ''
            }`}
          >
            <Icon name="plus" className="h-4 w-4" />
            <span className={isCollapsed ? 'md:hidden' : ''}>New Chat</span>
          </button>
        </div>

        <div className="scrollbar-hidden mt-6 min-h-0 flex-1 overflow-y-auto px-2">
          {!isCollapsed && (
            <p className="mb-2 px-2 text-sm font-medium text-slate-500 dark:text-slate-400">
              Chats
            </p>
          )}

          {isLoading ? (
            <p className={`px-2 py-2 text-sm text-slate-400 ${isCollapsed ? 'md:hidden' : ''}`}>
              Loading...
            </p>
          ) : chats.length === 0 ? (
            <p className={`px-2 py-2 text-sm text-slate-400 ${isCollapsed ? 'md:hidden' : ''}`}>
              No chats yet
            </p>
          ) : (
            <ul className="space-y-1">
              {chats.map((chat) => (
                <li key={chat._id} className="group flex items-start">
                  <button
                    type="button"
                    title={chat.title || 'Chat'}
                    onClick={() => {
                      onSelectChat(chat)
                      onClose()
                    }}
                    className={`min-w-0 flex-1 whitespace-normal break-words rounded-lg px-2 py-2 text-left text-sm leading-5 ${
                      activeChatId === chat._id
                        ? 'bg-slate-200/70 text-slate-900 dark:bg-slate-800 dark:text-white'
                        : 'text-slate-600 hover:bg-slate-200/50 dark:text-slate-300 dark:hover:bg-slate-800/70'
                    } ${isCollapsed ? 'md:hidden' : ''}`}
                  >
                    {chat.title || 'New Chat'}
                  </button>

                  {isCollapsed && (
                    <button
                      type="button"
                      title={chat.title || 'Open chat'}
                      aria-label={`Open ${chat.title || 'chat'}`}
                      onClick={() => onSelectChat(chat)}
                      className={`hidden rounded-lg p-2 text-slate-500 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 md:block ${
                        activeChatId === chat._id ? 'bg-slate-200 dark:bg-slate-800' : ''
                      }`}
                    >
                      <Icon name="message" className="h-4 w-4" />
                    </button>
                  )}

                  <button
                    type="button"
                    aria-label={`Delete ${chat.title || 'chat'}`}
                    title="Delete chat"
                    onClick={() => onDeleteChat(chat._id)}
                    className="ml-1 rounded-lg p-2 text-slate-400 opacity-0 hover:bg-red-50 hover:text-red-600 focus:opacity-100 group-hover:opacity-100 dark:hover:bg-red-950/40"
                  >
                    <Icon name="trash" className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <div className={`flex items-center gap-2.5 ${isCollapsed ? 'justify-center' : ''}`}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d8f4f6] text-xs font-semibold text-[#087b88]">
              {displayName.charAt(0).toUpperCase()}
            </span>
            <span
              title={displayName}
              className={`min-w-0 truncate text-sm text-slate-700 dark:text-slate-200 ${
                isCollapsed ? 'md:hidden' : ''
              }`}
            >
              {displayName}
            </span>
          </div>
          <button
            type="button"
            aria-label="Log out"
            title="Log out"
            onClick={onLogout}
            disabled={isLoggingOut}
            className={`mt-3 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-500 transition hover:bg-slate-200 hover:text-slate-800 disabled:cursor-wait disabled:opacity-60 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <Icon name="logout" className="h-4 w-4 shrink-0" />
            <span className={isCollapsed ? 'md:hidden' : ''}>
              {isLoggingOut ? 'Logging out...' : 'Log out'}
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default ChatSidebar
