import PollSection from '@/components/poll/PollSection'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const page = async ({ params }: { params: any }) => {
 
  const { pollId }: { pollId: string } = await params

  return (
    <section className='w-full h-full flex justify-center items-center'>
     <PollSection pollId={pollId}/> 
    </section>
  )
}

export default page
