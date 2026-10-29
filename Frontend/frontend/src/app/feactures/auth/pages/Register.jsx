
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('Your form is ready to connect to an authentication service.')
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#191A1A] px-4 py-12 text-white">
      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#202222] p-8 shadow-2xl sm:p-10">
        <div className="mb-8">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#20B8CD] text-xl font-bold text-[#101414]">
            P
          </div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#20B8CD]">Get started</p>
          <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm text-white/60">Sign up to get started.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="register-username" className="mb-2 block text-sm font-medium text-white/90">Username</label>
            <input
              id="register-username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Choose a username"
              className="w-full rounded-xl border border-white/10 bg-[#171919] px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#20B8CD] focus:ring-2 focus:ring-[#20B8CD]/20"
            />
          </div>
          <div>
            <label htmlFor="register-email" className="mb-2 block text-sm font-medium text-white/90">Email address</label>
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-[#171919] px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#20B8CD] focus:ring-2 focus:ring-[#20B8CD]/20"
            />
          </div>
          <div>
            <label htmlFor="register-password" className="mb-2 block text-sm font-medium text-white/90">Password</label>
            <input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              className="w-full rounded-xl border border-white/10 bg-[#171919] px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#20B8CD] focus:ring-2 focus:ring-[#20B8CD]/20"
            />
          </div>

          <button type="submit" className="w-full rounded-xl bg-[#20B8CD] px-4 py-3 font-semibold text-[#101414] transition hover:bg-[#38C6D8] focus:outline-none focus:ring-2 focus:ring-[#20B8CD] focus:ring-offset-2 focus:ring-offset-[#191A1A]">
            Create account
          </button>
          <p aria-live="polite" className="min-h-5 text-center text-sm text-white/80">{message}</p>
        </form>

        <p className="mt-5 text-center text-sm text-white/60">
          Already have an account?{' '}
          <button type="button" onClick={() => navigate('/login')} className="font-semibold text-[#20B8CD] transition hover:text-[#72D8E4]">
            Sign in
          </button>
        </p>
      </section>
    </main>
  )
}

export default Register
