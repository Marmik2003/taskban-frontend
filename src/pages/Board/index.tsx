import React from 'react'
import Kanban from './Kanban'
import { authorQuoteMap } from './data'

const IndividualBoard = () => {

  return (
    <div className='w-fit overflow-x-scroll'>
      <div>Board</div>
      <Kanban initial={authorQuoteMap} />
    </div>
  )
}

export default IndividualBoard