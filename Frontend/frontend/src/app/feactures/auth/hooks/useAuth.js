
import {useDispatch} from 'react-redux'
import {register,login,getme} from '../services/auth.api.js'
import {setUser,setLoading,setError} from '../auth.slice.js'


export function useAuth(){

    const dispatch = useDispatch();

    async function handleRegister({username,email,password}){

        try{
            dispatch(setLoading(true))
            await register({username,email,password})
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({email,password}){
        try{
            dispatch(setLoading(true))
            const response = await login({email,password})
            dispatch(setUser(response.user))
            return { success: true }
        } catch (error) {
            const message = error.response?.data?.message
                || error.response?.data?.errors?.[0]?.msg
                || "Login failed. Please try again."
            dispatch(setError(message))
            return { success: false, message }
        }finally{
            dispatch(setLoading(false))
        }
    } 

    async function handleGetme(){
        try{
            dispatch(setLoading(true))
            const response = await getme()
            dispatch(setUser(response.user))
        }catch(error){
            dispatch(setUser(null))
            dispatch(setError(error.response?.data?.message || "Failed to fetch user data"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    return{
        handleRegister,
        handleLogin,
        handleGetme
    }
}

