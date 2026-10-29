import Icon from './Icon.jsx'

function ChatHeader({ isDark, onToggleSidebar, onToggleTheme, title }) {
  return (
    <header className="flex h-18 shrink-0 items-center justify-between border-b border-slate-200/80 px-4 dark:border-slate-700 sm:px-6">
      <button
        type="button"
        aria-label="Toggle sidebar"
        onClick={onToggleSidebar}
        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        <Icon name="panel" className="hidden h-5 w-5 md:block" />
        <Icon name="menu" className="h-5 w-5 md:hidden" />
      </button>
      <span className="hidden max-w-[60%] truncate text-sm font-medium text-slate-600 dark:text-slate-300 md:inline">
        {title || 'New Chat'}
      </span>
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 md:hidden">Perplexity</span>
      <button
        type="button"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        aria-pressed={isDark}
        onClick={onToggleTheme}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        <Icon name={isDark ? 'sun' : 'moon'} className="h-4 w-4" />
      </button>
    </header>
  )
}

export default ChatHeader
