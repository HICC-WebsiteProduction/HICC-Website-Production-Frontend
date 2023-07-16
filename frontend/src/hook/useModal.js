import { useEffect, useState } from 'react';

export default function useModal(modalRef) {
  const [modalOpen, setModalOpen] = useState(false);

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

  return modalOpen;
}
