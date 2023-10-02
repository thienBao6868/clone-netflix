
'use client'
import { signOut } from 'next-auth/react'
import React from 'react'


const Button = () => {
  return (
    <button onClick={()=>signOut()} className="bg-white h-10 w-full ">sign out</button>
  )
}

export default Button