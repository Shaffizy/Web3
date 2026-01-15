import React from 'react';
import { images } from '../../constants';

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`} onClick={onClick}>
      <div className="faq-question">
        <div className="text-block-14">{question}</div>
        <img
          loading="lazy"
          src="https://cdn.prod.website-files.com/6953b51a00729d30773ab884/6956b86852cf5684a5f4ccfd_plusarrow.svg"
          alt="toggle"
          className="arrrow-xando"
          style={{
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}
        />
      </div>
      
      <div 
        className="faq-answer" 
        style={{ 
          maxHeight: isOpen ? '300px' : '0px',
          opacity: isOpen ? '1' : '0',
          overflow: 'hidden',
          transition: 'all 0.4s ease-in-out'
        }}
      >
        <div className="faq-holder-answer">
          <p className="paragraph">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;