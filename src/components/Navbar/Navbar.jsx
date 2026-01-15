import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import './Navbar.css';
import {images} from '../../constants'

const Navbar = () => {

const [toggle, setToggle] = useState(false);

const navItems = [
  { label: 'About Us', className: '' },
  { label: 'Services', className: '' },
  { label: 'Case Studies', className: '' },
  { label: 'Team', className: '' },
  { label: 'FAQ', className: '' },
  { label: 'Blog', className: '' },
  { label: 'Contact Us', className: 'app__navbar-menu-button' },
];


  return (
    <nav className='app__navbar'>
        <div className='app__navbar-logo'>
            <img src={images.logo} alt="" srcSet="" />
        </div>
        <ul className='app__navbar-links'>
            {['About Us','Services','Case Studies','Team','FAQ','Blog'].map((item) =>(
                <li className='app__flex p-text' key={`link-${item}`}>
                <a href={`#${item.replace(/\s+/g, '')}`}>{item}</a>
                </li>
            )
            )}
        </ul>
        <div className='app__navbar-button'><span>Contact Us</span></div>

        <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <div>
            <HiX onClick={() => setToggle(false)} />
              <ul>
                {navItems.map(({ label, className }) => (
                  <li key={label} className={className}>
                    <a
                      href={`#${label.replace(/\s+/g, '')}`}
                      onClick={() => setToggle(false)}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            
          </div>        
        )}
      </div>
    </nav>
 
  )
}

export default Navbar