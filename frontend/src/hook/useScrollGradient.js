import { useEffect, useState } from 'react';

// 스크롤 하단 그라데이션 기능을 넣어주는 커스텀 훅
// 스크롤 해당 ref를 인자로 받음
function useScrollGradient(ref) {
  const [showGradient, setShowGradient] = useState(false);
  const [showGradientTop, setShowGradientTop] = useState(true);

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

    // 스크롤이 맨 위로 도달하면 상단 그라데이션 제거
    const isAtTop = container.scrollTop === 0;
    setShowGradientTop(!isAtTop);

    // 제일 하단으로 이동하면 그라데이션 제거
    const isAtBottom =
      container.scrollHeight - Math.ceil(container.scrollTop) ===
      container.clientHeight;

    setShowGradient(!isAtBottom);
  };

  return { showGradient, showGradientTop };
}

export default useScrollGradient;
