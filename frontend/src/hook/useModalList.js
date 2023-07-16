import { useEffect, useState } from 'react';

// list: id를 담은 배열
// modalRef: 모달 창이 보여질 공간
export default function useModalList(modalRef, list) {
  const [modalList, setModalList] = useState(
    list.map(item => ({ id: item, modalOpen: false })),
  );

  const handleModalOpen = id => {
    const updateState = modalList.map(item => {
      return {
        ...item,
        modalOpen: item.id === id,
      };
    });
    setModalList(updateState);
  };

  const handleModalClose = () => {
    const updateState = modalList.map(item => {
      return {
        ...item,
        modalOpen: false,
      };
    });
    setModalList(updateState);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        modalRef.current == null ||
        !modalRef.current.contains(event.target)
      ) {
        handleModalClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return [modalList, handleModalOpen];
}
