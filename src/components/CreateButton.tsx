import { Button } from 'src/ui/button'
import { PlusSquare } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const CreateButton = () => {
  return (
    <Button asChild className='bg-point hover:bg-point-hover active:bg-point-active shadow-xl rounded-xl fixed top-3/4 left-1/2 z-50'>
      <Link to={'create'}>
        <PlusSquare color="#ffffff" />
        <span className='ml-2 font-bold'>생성하기</span>
      </Link>
    </Button>
  )
}

export default CreateButton
