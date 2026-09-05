import React, { useRef, useState, useEffect } from 'react';

/**
 * ScrollColorImage Component
 * - Desktop (@media (hover: hover)): Displays B&W by default, turns full color on hover.
 * - Mobile (@media (hover: none)): Uses IntersectionObserver to smoothly transition B&W -> full color automatically when scrolled into view.
 */
export default function ScrollColorImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  ...props
}) {
  const imgRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading={loading}
      className={`scroll-color-img ${isInView ? 'is-in-view' : ''} ${className}`}
      {...props}
    />
  );
}
