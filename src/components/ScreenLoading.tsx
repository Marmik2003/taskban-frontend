import React from 'react'
import LoadingComponent from './LoadingComponent'

const ScreenLoading = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-100 z-50">
      <LoadingComponent />
    </div>
  )
}

export default ScreenLoading