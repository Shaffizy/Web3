import React from 'react'
import './Slider.css'

const Slider = () => {
    const stats = [
        {
            value: "200+",
            title: 'Projects Launched',
        },
        {
            value: '$200M+',
            title: 'Total Funds Raised',
        },
        {
            value: '100M+',
            title: 'Total Followers',
        },
    ];

  return (  
    <div className='app__slider'>
        {stats.map((item, index) => (
            <div key={index} className="stat-card">
                <h2>{item.value}</h2>
                <p>{item.title}</p>
            </div>
        ))}

    </div>
  )
}

export default Slider