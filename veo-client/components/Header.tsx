import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
     <header className='sticky top-0 w-full h-12 flex items-center px-4 border border-b bg-background z-50'>
        <Link href={'/home'} className='font-bold text-primary'>Veo</Link>

     </header> 
  )
}

export default Header
