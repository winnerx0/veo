import PollSection from '@/components/poll/PollSection'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const page = async ({ params: { pollId } }: { params: { pollId: string } }) => {
 
  return (
    <section>
     <PollSection pollId={pollId}/> 
    </section>
  )
}

export default page
