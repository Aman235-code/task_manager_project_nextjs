'use client'
import { httpAxios } from '@/helper/httpHelper';
import { current } from '@/services/userService';
import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import UserContext from './UserContext';

const UserProvider = ({children}) => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
      async function load(){
        try {

            const user =  await current()
            setUser({...user})
             
         } catch (error) {
             console.log(error);
             toast.error("Error In loading current User")
             setUser(undefined)
         }
      }
      load();
    }, [])
    

  return (
    <UserContext.Provider value={{ user,setUser }}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider;