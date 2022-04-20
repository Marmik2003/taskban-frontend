import React from 'react'
import LoadingComponent from './LoadingComponent'

const ScreenLoading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 z-50">
      <LoadingComponent />
    </div>
  )
}

export default ScreenLoading