import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
     <header className='w-full h-10 flex items-center px-4 border border-b'>
        <Link href={'/home'} className='font-bold'>Veo</Link>

     </header> 
  )
}

export default Header
