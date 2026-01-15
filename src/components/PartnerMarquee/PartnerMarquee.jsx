import React from 'react';
import { images } from '../../constants';
import './PartnerMarquee.css';

const PartnerMarquee = () => {
  // Organizing your imported images into an array
  const partners = [images.medusa, images.httpool, images.tensor, images.lingo, images.adroll];

  // We render the list twice inside the track to create the infinite loop
  const MarqueeRow = ({ direction }) => (
    <div className="carasel-container">
      <div className={`logo-cont ${direction}`}>
        <div className="logo-group">
          {partners.map((logo, index) => (
            <img key={`row1-${index}`} src={logo} alt="partner" className="logo-image" />
          ))}
        </div>
        {/* Duplicate group for seamless looping */}
        <div className="logo-group">
          {partners.map((logo, index) => (
            <img key={`row2-${index}`} src={logo} alt="partner" className="logo-image" />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="partner-bottom">
      {/* Top row moving Left */}
      <MarqueeRow direction="move-left" />
      
      {/* Middle row moving Right (cara-2) */}
      <MarqueeRow direction="move-right" />

      {/* Optional third row moving Left again to match your snippet */}
      <MarqueeRow direction="move-left" />
    </div>
  );
};

export default PartnerMarquee;