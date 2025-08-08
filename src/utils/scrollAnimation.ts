
/**
 * Utility to handle scroll animations
 * Activates elements with .reveal, .slide-left, and .slide-right classes when they enter the viewport
 */

export const initScrollAnimations = () => {
  const handleScroll = () => {
    const reveals = document.querySelectorAll('.reveal, .slide-left, .slide-right');
    
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll);
  // Trigger once on initial load
  handleScroll();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

/**
 * Component hook for scroll animations
 */
import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    return initScrollAnimations();
  }, []);
};
