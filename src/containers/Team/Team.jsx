import React, { useLayoutEffect, useRef, useState } from 'react';
import { teamData } from './TeamData';
import Props from '../../components/Props/Props';
import { images } from './../../constants';
import gsap from 'gsap';
import './Team.css';

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(teamData[0]);
  const gridRef = useRef(null);
  const loopRef = useRef(null);
  
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
        if (window.innerWidth <= 991) {
            const cards = gsap.utils.toArray(gridRef.current?.children || []);
            
            const loop = horizontalLoop(cards, {
            paused: true,
            repeat: -1,
            paddingRight: 20,
            // Increase speed for smoother internal calculations
            speed: 1.5 
            });

            loopRef.current = loop;

            const handleTouchStart = (e) => {
            touchStartX.current = e.touches[0].clientX;
            touchCurrentX.current = e.touches[0].clientX;
            };

            const handleTouchMove = (e) => {
            touchCurrentX.current = e.touches[0].clientX;
            };

            const handleTouchEnd = () => {
            const delta = touchStartX.current - touchCurrentX.current;
            
            // Lower threshold (20px) makes it feel more responsive
            if (Math.abs(delta) < 20) return; 

            // Faster duration (0.4s) and "power2.out" for a snappy "flick" feel
            if (delta > 0) {
                loop.next({ duration: 0.4, ease: 'power2.out' });
            } else {
                loop.prev({ duration: 0.4, ease: 'power2.out' });
            }
            };

            const element = gridRef.current;
            element.addEventListener('touchstart', handleTouchStart, { passive: true });
            element.addEventListener('touchmove', handleTouchMove, { passive: true });
            element.addEventListener('touchend', handleTouchEnd);

            return () => {
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchmove', handleTouchMove);
            element.removeEventListener('touchend', handleTouchEnd);
            };
        }
        }, gridRef);

        return () => ctx.revert();
    }, []);

  return (
    <section className="team-section">
      <div className="container">
        <Props 
          company="Team"
          title="The"
          passage="Minds"
          highlightOne="Behind"
          highlightTwo="InsightBlitz"
          description="A senior team of strategists, designers, and builders shaping high-impact Web3 growth through insight, precision, and execution."
          id="Team"
        />

        <div className="team-layout">
          {/* Grid: Left on Desktop, Bottom on Mobile */}
          <div className="team-grid" ref={gridRef}>
            {teamData.map((member) => (
              <div 
                key={member.id} 
                className={`member-wrapper ${selectedMember.id === member.id ? 'active' : ''}`}
                onClick={() => setSelectedMember(member)}
              >
                <div className="member-image-wrap">
                  <img src={member.img} alt={member.name} className="member-thumb" />
                  <div className="member-tag">{member.abbr}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Spotlight: Right on Desktop, Top on Mobile */}
          <div className="team-spotlight">
            <div className="spotlight-frame">
              <img src={selectedMember.img} alt={selectedMember.name} className="spotlight-img" />
              <div className="spotlight-content">
                <div className="spotlight-text">
                  <h3>{selectedMember.name}</h3>
                  <p>{selectedMember.role}</p>
                </div>
                <a href={selectedMember.twitter} target="_blank" rel="noreferrer" className="x-link">
                  <img src={images.twitter} alt="X" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Helper Function ---
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}}),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
      totalWidth, curX, distanceToStart, distanceToLoop, item, i;
  
  gsap.set(items, { 
    xPercent: (i, target) => {
      let w = widths[i] = parseFloat(gsap.getProperty(target, "width", "px"));
      xPercents[i] = snap(parseFloat(gsap.getProperty(target, "xPercent", "%")) + (gsap.getProperty(target, "x", "px") / w) * 100);
      return xPercents[i];
    }
  });
  gsap.set(items, {x: 0});
  totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = xPercents[i] / 100 * widths[i];
    distanceToStart = item.offsetLeft - startX + curX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
      .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
    let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
    if (time < tl.time() === index > curIndex) {
        vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
        time = tl.duration() * (index > curIndex ? 1 : -1) + time;
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = vars => toIndex(curIndex + 1, vars);
  tl.prev = vars => toIndex(curIndex - 1, vars);
  return tl;
}

export default Team;