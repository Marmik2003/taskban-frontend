import React from 'react'
import DialogBox from '../../components/DialogBox'
import Board from '../../types/Board'

interface BoardDialogProps {
  isOpen: boolean
  closeDialog: () => void
  dialogState: Board
  setDialogState: React.Dispatch<React.SetStateAction<Board>>
}

const BoardDialog = ({isOpen, closeDialog, dialogState, setDialogState}: BoardDialogProps) => {
  return (
    <DialogBox dialogTitle={dialogState.id === 0 ? 'New Board' : 'Edit Board'} isOpen={isOpen} closeDialog={closeDialog}>
      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <label className='block text-gray-700 text-sm font-bold mt-2'>
            Board Name
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='Enter board name'
            value={dialogState.title}
            onChange={(e) => setDialogState({...dialogState, title: e.target.value})}
          />
        </div>
        <div className='flex flex-col'>
          <label className='block text-gray-700 text-sm font-bold mt-2'>
            Board Description
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='Enter board description'
            value={dialogState.description}
            onChange={(e) => setDialogState({...dialogState, description: e.target.value})}
          />
        </div>
      </div>

      <div className='flex justify-end my-3'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={closeDialog}
        >
          Create
        </button>
      </div>
    </DialogBox>
  )
}

export default BoardDialog