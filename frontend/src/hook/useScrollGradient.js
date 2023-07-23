import { useEffect, useState } from 'react';

// 스크롤 하단 그라데이션 기능을 넣어주는 커스텀 훅
// 스크롤 해당 ref를 인자로 받음
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

  // 제일 하단으로 이동하면 그라데이션 제거
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
