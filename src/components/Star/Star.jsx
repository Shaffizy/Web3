import React from 'react'
import './Star.css'

const Star = () => {
    const stars = Array.from({ length: 100 }, () => ({
    top: Math.random() * window.innerHeight,
    left: Math.random() * window.innerWidth,
    delay: Math.random() * 2
  }));
  return (
    <div className="star-bg">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${star.top}px`,
              left: `${star.left}px`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>
  )
}

export default Star