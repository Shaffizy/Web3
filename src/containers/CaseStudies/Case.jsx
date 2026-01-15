import React, { useLayoutEffect, useRef, useState } from 'react'; // Added useState
import { projectData } from './ProjectData';
import Props from '../../components/Props/Props';
import ProjectCard from './ProjectCard';
import gsap from 'gsap';

import './Case.css';

const Case = () => {
  const scrollRef = useRef(null);
  const cardsRef = useRef(null);

  const loopRef = useRef(null);
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0); // Tracking index for dots

// Inside your useLayoutEffect in Case.jsx
useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(cardsRef.current?.children || []);
        console.log('GSAP cards found:', cards.length);

      
      const loop = horizontalLoop(cards, {
        paused: true,
        repeat: -1,
        paddingRight: 30,
        onIndexChange: (index) => {
          // Keep your center spotlight logic
          const middleIndex = (index + 1) % projectData.length;
          setActiveIndex(middleIndex);
        }
      });

      loopRef.current = loop;

        const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchMove = (e) => {
        touchCurrentX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
        const delta = touchStartX.current - touchCurrentX.current;

        console.log('touch delta:', delta);

        if (Math.abs(delta) < 30) return;

        delta > 0
            ? loop.next({ duration: 0.6, ease: 'power1.inOut' })
            : loop.prev({ duration: 0.6, ease: 'power1.inOut' });
        };


      const element = scrollRef.current;
      // 'passive: true' ensures smooth vertical page scrolling remains unaffected
      element.addEventListener('touchstart', handleTouchStart, { passive: true });
      element.addEventListener('touchmove', handleTouchMove, { passive: true });
      element.addEventListener('touchend', handleTouchEnd);
      

      return () =>{
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
       }
      
    }, scrollRef);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    loopRef.current.next({ duration: 0.4, ease: "power1.inOut" });
  };

  const handlePrev = () => {
    loopRef.current.prev({ duration: 0.4, ease: "power1.inOut" });
  
};

  return (
    <section className='Case' id="Projects">
      <Props
        company="Case Studies"
        title=""
        passage="Backed by"
        highlightTwo="Data"
        highlightOne="Execution"
        description="A look at how we help elite crypto teams execute marketing with clarity and impact."
        showLine={false}
        id='CaseStudies'
      />

      <div className="case-slider-wrapper" ref={scrollRef}>
        <div className="slider-navigation">
          <button className="nav-arrow prev" onClick={handlePrev}><img src="https://cdn.prod.website-files.com/6953b51a00729d30773ab884/69565d349ac533d993d115bb_arrow-left.svg" loading="lazy" alt=""></img></button>
          <button className="nav-arrow next" onClick={handleNext}><img src="https://cdn.prod.website-files.com/6953b51a00729d30773ab884/69565d40580311d2f59569e7_arrow-right.svg" loading="lazy" alt=""></img></button>
        </div>

        <ProjectCard 
            ref={cardsRef} 
            activeIndex={activeIndex} // THIS LINE IS MISSING IN YOUR CODE
        />

        <div className="pagination-footer">
          {projectData.map((_, i) => (
            <div 
              key={i} 
              // Dot turns white when activeIndex matches loop index
              className={`dot ${activeIndex === i ? 'active' : ''}`} 
              onClick={() => loopRef.current.toIndex(i - 1, { duration: 0.4, ease: "power1.inOut" })}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Helper Function (Added onIndexChange support) ---
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

    // UPDATE THIS PART:
    curIndex = newIndex; 
    vars.overwrite = true;

    // This MUST happen before the tween returns to update React immediately
    if (config.onIndexChange) {
        config.onIndexChange(curIndex);
    }

    return tl.tweenTo(time, vars);
}
  tl.next = vars => toIndex(curIndex + 1, vars);
  tl.prev = vars => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true);
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

export default Case;