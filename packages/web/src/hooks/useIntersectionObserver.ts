import { useEffect, useRef } from 'react';

interface useIntersectionObserverProps {
  onIntersect: () => void;
}

const useIntersectionObserver = ({
  onIntersect,
}: useIntersectionObserverProps) => {
  const targetElement = useRef(null);

  useEffect(() => {
    if (!targetElement || !targetElement.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && onIntersect());
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(targetElement && targetElement.current);

    return () => {
      observer.disconnect();
    };
  }, [onIntersect]);

  return targetElement;
};

export default useIntersectionObserver;
