import React, { createContext, useState, useContext, useEffect } from 'react';

const AnimationContext = createContext();

export const useAnimation = () => useContext(AnimationContext);

export const AnimationProvider = ({ children }) => {
  const [animationState, setAnimationState] = useState(null);

  useEffect(() => {
    if (animationState) {
      const timer = setTimeout(() => {
        setAnimationState(null);
      }, 1000); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [animationState]);

  const startAnimation = (element, targetId, imgSrc) => {
    const startRect = element.getBoundingClientRect();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const endRect = targetElement.getBoundingClientRect();
      setAnimationState({
        startRect,
        endRect,
        imgSrc,
        timestamp: Date.now(),
      });
    }
  };

  return (
    <AnimationContext.Provider value={{ startAnimation }}>
      {children}
      {animationState && <FlyingProduct {...animationState} />}
    </AnimationContext.Provider>
  );
};

const FlyingProduct = ({ startRect, endRect, imgSrc, timestamp }) => {
  const [style, setStyle] = useState({
    position: 'fixed',
    left: startRect.left,
    top: startRect.top,
    width: startRect.width,
    height: startRect.height,
    opacity: 1,
    transition: 'all 1s ease-in-out',
    zIndex: 9999,
  });

  useEffect(() => {
    setTimeout(() => {
      setStyle({
        ...style,
        left: endRect.left + endRect.width / 2,
        top: endRect.top + endRect.height / 2,
        width: 0,
        height: 0,
        opacity: 0,
      });
    }, 0);
  }, [timestamp]);

  return (
    <div style={style}>
      <img src={imgSrc} alt="flying product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};