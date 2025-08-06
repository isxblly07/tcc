import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'

const LazyImage = ({ src, alt, className, ...props }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setLoading(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  if (error) {
    return (
      <div className={`d-flex align-items-center justify-content-center bg-light ${className}`} {...props}>
        <span className="text-muted">Imagem não disponível</span>
      </div>
    )
  }

  return (
    <div className="position-relative">
      {loading && (
        <div className={`d-flex align-items-center justify-content-center bg-light ${className}`} {...props}>
          <Spinner animation="border" size="sm" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        style={{ display: loading ? 'none' : 'block' }}
        {...props}
      />
    </div>
  )
}

export default LazyImage