import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouterProvider } from 'react-router'
import { router } from './app.router.jsx'
import { getme } from './feactures/auth/services/auth.api.js'
import {
  setError,
  setInitialized,
  setLoading,
  setUser,
} from './feactures/auth/auth.slice.js'

function App() {
  const dispatch = useDispatch()
  const initialized = useSelector((state) => state.auth.initialized)

  useEffect(() => {
    let isCurrent = true

    async function restoreSession() {
      try {
        const response = await getme()
        if (isCurrent) {
          dispatch(setUser(response.user))
          dispatch(setError(null))
        }
      } catch (error) {
        if (isCurrent) {
          dispatch(setUser(null))

          if (error.response?.status !== 401) {
            dispatch(setError(
              error.response?.data?.message || 'Could not restore your login session.'
            ))
          }
        }
      } finally {
        if (isCurrent) {
          dispatch(setLoading(false))
          dispatch(setInitialized(true))
        }
      }
    }

    restoreSession()

    return () => {
      isCurrent = false
    }
  }, [dispatch])

  if (!initialized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fcfcfb] text-sm text-slate-500 dark:bg-[#111315] dark:text-slate-400">
        Restoring your session...
      </main>
    )
  }

  return <RouterProvider router={router} />
}

export default App