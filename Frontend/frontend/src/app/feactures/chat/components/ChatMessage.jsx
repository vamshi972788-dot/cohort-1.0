function ChatMessage({ message }) {
  return (
    <div className={`mb-5 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[90%]">
        <p
          className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-[15px] leading-6 ${
            message.role === 'user'
              ? 'rounded-br-md bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100'
              : 'rounded-bl-md bg-[#e9f8f9] text-slate-800 dark:bg-[#17383c] dark:text-slate-100'
          }`}
        >
          {message.content}
        </p>
        {message.sources?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="max-w-full truncate rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-600 hover:border-[#20b8cd] hover:text-[#087b88] dark:border-slate-700 dark:text-slate-300"
              >
                {source.title || source.url}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatMessage
