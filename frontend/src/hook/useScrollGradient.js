import { useEffect, useState } from 'react';

function useScrollGradient(ref) {
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    const container = ref.current;
    container.addEventListener('scroll', handleScroll);

    handleScroll({ target: container });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  const handleScroll = event => {
    const container = event.target;

    const isAtBottom =
      container.scrollHeight - Math.ceil(container.scrollTop) ===
      container.clientHeight;

    setShowGradient(!isAtBottom);
  };

  return showGradient;
}

export default useScrollGradient;
