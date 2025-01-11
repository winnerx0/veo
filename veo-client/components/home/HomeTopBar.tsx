'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const HomeTopBar = () => {

  const router = useRouter()

  return (
    <div className='flex w-full mt-4'>

      <div className="w-full flex items-center justify-between">
        <h1 className='font-bold text-xl'>Your Polls</h1>
        <Button onClick={() => router.push('/poll/create')}>Create Poll</Button>
      </div>
    </div>
  )
}

export default HomeTopBar