import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='relative border w-full max-w-[500px] h-[300px] gap-4 rounded-md p-6 flex flex-col items-center justify-center'>
        <h3 className='font-semibold text-2xl absolute top-4 left-4'>Login to Veo</h3>
        <div className='w-full flex flex-col gap-4 self-center'>
            <div className='w-full flex flex-col gap-2'>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor="email" className='font-semibold tracking-wide'>Email</label>
            <input type="email" name='email' className='border w-full h-8 p-2' placeholder='michael@gmail.com'/>
            </div>
                <label htmlFor="password" className='font-semibold tracking-wide'>Password</label>
            <input type="password" name='password' className='border w-full h-8 p-2' placeholder='michael1234'/>
            </div>
        </div>
        <p>No an account ? <Link to={'/auth/register'} className='text-orange-300'>Register</Link></p>
        <button className='bg-orange-400 text-white w-36 rounded-md h-8 absolute bottom-4'>Register</button>
    </div>
  )
}

export default Login