import Icon from './Icon.jsx'

function ChatComposer({
  draft,
  isDisabled,
  isSearchMode,
  isSending,
  onDraftChange,
  onSearchModeChange,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_32px_rgba(15,23,42,0.08)] focus-within:border-[#20b8cd]/60 dark:border-slate-700 dark:bg-[#202326]"
    >
      <textarea
        aria-label="Ask a question"
        placeholder="Ask anything..."
        rows={2}
        value={draft}
        disabled={isDisabled}
        onChange={(event) => onDraftChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault()
            event.currentTarget.form?.requestSubmit()
          }
        }}
        className="max-h-40 min-h-14.5 w-full resize-y bg-transparent px-2 py-1 text-[15px] leading-6 text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
      <div className="flex items-center justify-between border-t border-slate-100 px-1 pt-2 dark:border-slate-700">
        <button
          type="button"
          aria-pressed={isSearchMode}
          onClick={onSearchModeChange}
          className={`flex items-center gap-2 rounded-lg px-2 py-1 text-xs transition ${
            isSearchMode
              ? 'bg-[#20b8cd]/10 text-[#087b88]'
              : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <Icon name="search" className="h-4 w-4" />
          <span>Search</span>
        </button>
        <button
          type="submit"
          aria-label="Send"
          disabled={!draft.trim() || isDisabled}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#20b8cd] text-white transition hover:bg-[#159eaf] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          {isSending ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <Icon name="send" className="h-4 w-4" />
          )}
        </button>
      </div>
    </form>
  )
}

export default ChatComposer
