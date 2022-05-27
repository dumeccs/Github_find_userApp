import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

export const GithubContextProvider  = ({children}) => {
  
    const initialState = {
        users : [],
        loading : false
    }

    // const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
    // const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

    const [state, dispatch] = useReducer(githubReducer, initialState)
    const setLoading = () => dispatch({type: 'SET_LOADING'})


const searchUsers = async (text) => {

    setLoading()

    const params = new URLSearchParams({
        q : text
    })
    const response = await fetch(`https://api.github.com/search/users/${params}`)

    const { items } = await response.json()

    dispatch({
        type : 'GET_USERS',
        payload : items,
    })
}

    return <GithubContext.Provider
        value = {
            {
                loading : state.loading,
                users : state.users,
                searchUsers
            }
        }
    >
        {children}

    </GithubContext.Provider>
}


export default GithubContext