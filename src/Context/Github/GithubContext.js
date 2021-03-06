import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

export const GithubContextProvider  = ({children}) => {
  
    const initialState = {
        users : [],
        user : {},
        loading : false
    }

    // const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
    // const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

    const [state, dispatch] = useReducer(githubReducer, initialState)
    const setLoading = () => dispatch({type: 'SET_LOADING'})
    const clearUsers =() => {
        dispatch({
            type : 'CLEAR_USERS'
        })
    }

const searchUsers = async (text) => {

    setLoading()

    const params = new URLSearchParams({
        q : text
    })
    const response = await fetch(`https://api.github.com/search/users?${params}`)
    
    const { items } = await response.json()
    


    dispatch({
        type : 'GET_USERS',
        payload : items,
    })

}



//single User
const getUser = async (login) => {

    setLoading()

    
    const response = await fetch(`https://api.github.com/user?${login}`)
    
    if(response.status === 404){
        window.location = '/notfound'
    }
    else{

        const data = await response.json()

        dispatch({
            type : 'GET_USER',
            payload : data,
        })
    }

  
    


    

}



    return <GithubContext.Provider
        value = {
            {
                loading : state.loading,
                users : state.users,
                user : state.user,
                searchUsers,
                getUser,
                clearUsers,
            }
        }
    >
        {children}

    </GithubContext.Provider>
}


export default GithubContext