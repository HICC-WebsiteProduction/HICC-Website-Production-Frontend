import { useCallback, useEffect, useState } from 'react';

/**
 * useModal
 * 모달 창을 띄우기 위한 함수
 * 바깥을 클릭하면 꺼진다.
 * modalOpen을 리턴함으로써 현재 모달창 상태만 반환된다.
 * closeModal을 이용하여 모달을 끌수도 있다.
 */
export default function useModal(modalRef) {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        modalRef.current == null ||
        !modalRef.current.contains(event.target)
      ) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    modalRef.current?.addEventListener('click', () => setModalOpen(true));
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      modalRef.current?.removeEventListener('click', () => setModalOpen(true));
    };
  }, [modalRef]);

  return [modalOpen, closeModal];
}
