
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
const HomeTopBar = () => {

  const navigate = useNavigate()

  return (
    <div className='flex w-full mt-4'>

      <div className="w-full flex items-center justify-between">
        <h1 className='font-bold text-xl'>Your Polls</h1>
        <Button onClick={() => navigate('/polls/create')} className='rounded-full'>Create Poll</Button>
      </div>
    </div>
  )
}

export default HomeTopBar