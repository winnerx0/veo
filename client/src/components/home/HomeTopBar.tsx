
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
const HomeTopBar = () => {

  const navigaion = useNavigate()

  return (
    <div className='flex w-full mt-4'>

      <div className="w-full flex items-center justify-between">
        <h1 className='font-bold text-xl'>Your Polls</h1>
        <Button onClick={() => navigaion('/polls/create')}>Create Poll</Button>
      </div>
    </div>
  )
}

export default HomeTopBar