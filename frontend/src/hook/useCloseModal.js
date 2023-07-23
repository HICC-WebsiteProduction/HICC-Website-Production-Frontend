import { useEffect } from 'react';

// 모달 창을 종료하기 위해 만든 커스텀 훅
// 모달 ref와 종료 함수를 받음
function useCloseModal(modalRef, closeModal) {
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  return handleClickOutside;
}

export default useCloseModal;
