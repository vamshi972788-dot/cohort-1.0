
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'



const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.auth.loading)



  const {handleLogin} = useAuth()

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    const payload = {
      email,
      password,
    }

    const result = await handleLogin(payload)

    if (result.success) {
      navigate('/')
    } else {
      setMessage(result.message)
    }
  }

  if(!loading && user){
    return <Navigate to="/" replace />
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#191A1A] px-4 py-12 text-white">
      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#202222] p-8 shadow-2xl sm:p-10">
        <div className="mb-8">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#20B8CD] text-xl font-bold text-[#101414]">
            P
          </div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#20B8CD]">Welcome back</p>
          <h1 className="text-3xl font-semibold tracking-tight">Sign in to your account</h1>
          <p className="mt-2 text-sm text-white/60">Enter your details to continue.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-white/90">Email address</label>
            <input
              id="login-email"
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
            <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-white/90">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-white/10 bg-[#171919] px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#20B8CD] focus:ring-2 focus:ring-[#20B8CD]/20"
            />
          </div>

          <button type="submit" className="w-full rounded-xl bg-[#20B8CD] px-4 py-3 font-semibold text-[#101414] transition hover:bg-[#38C6D8] focus:outline-none focus:ring-2 focus:ring-[#20B8CD] focus:ring-offset-2 focus:ring-offset-[#191A1A]">
            Sign in
          </button>
          <p aria-live="polite" className="min-h-5 text-center text-sm text-white/80">{message}</p>
        </form>

        <p className="mt-5 text-center text-sm text-white/60">
          Don&apos;t have an account?{' '}
          <button type="button" onClick={() => navigate('/register')} className="font-semibold text-[#20B8CD] transition hover:text-[#72D8E4]">
            Create one
          </button>
        </p>
      </section>
    </main>
  )
}

export default Login
