import axios from 'axios'
import React from 'react'

const page = async ({ params: { pollId } }: { params: { pollId: string } }) => {
 
  const res = await axios.get(`http://localhost:8080/api/v1/poll/${pollId}`, {

  })
 
  const poll = res.data

  console.dir(poll)
  return (
    <div>
      
    </div>
  )
}

export default page
