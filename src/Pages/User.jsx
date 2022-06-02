import React from 'react'
import { useEffect, useContext } from 'react'
import GithubContext from '../Context/Github/GithubContext'


const User = () => {
    const { getUser, user} = useContext(GithubContext)

    useEffect(() => {
            getUser()
    }, [])

  return (
    <div>
            
    </div>
  )
}

export default User