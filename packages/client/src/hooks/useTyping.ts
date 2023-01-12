import { useEffect, useState } from 'react';

const useTyping = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [isKeyPressed, setIsKeyPressed] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const startTyping = () => {
    setIsTyping(true);
    setIsKeyPressed(true);
    setCountdown(5);
  };

  const stopTyping = () => {
    setIsKeyPressed(false);
  };

  const cancelTyping = () => {
    setIsTyping(false);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (!isKeyPressed) {
      interval = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 100);
    } else if (isKeyPressed && countdown === 0) {
      if (interval) clearInterval(interval);
    }

    if (countdown === 0) {
      setIsTyping(false);
    }

    return () => {
      if (interval) {
        clearTimeout(interval);
      }
    };
  }, [countdown, isKeyPressed]);

  return {
    isTyping,
    startTyping,
    stopTyping,
    cancelTyping,
  };
};

export default useTyping;
