import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-6'>
        <Outlet/>
    </div>
  )
}

export default Auth