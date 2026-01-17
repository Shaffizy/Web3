import React, { useEffect } from 'react';
import { HiX } from 'react-icons/hi';
import './NavMenu.css';

const NavMenu = ({ setToggle, navItems }) => {
  useEffect(() => {
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="app__navbar-menu-overlay">
      <HiX onClick={() => setToggle(false)} />
      <ul>
        {navItems.map((item, index) => (
          <li key={index} className={item.className}>
            <a 
              href={`#${item.label.replace(/\s+/g, '')}`} 
              onClick={() => setToggle(false)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavMenu;