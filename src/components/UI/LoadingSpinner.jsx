import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingSpinner = ({ size = 'md', text = 'Carregando...' }) => {
  return (
    <div className="loading-spinner">
      <div className="text-center">
        <Spinner animation="border" size={size} />
        <p className="mt-2">{text}</p>
      </div>
    </div>
  )
}

export default LoadingSpinner