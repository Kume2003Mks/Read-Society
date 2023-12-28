import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import { Icon } from '@iconify/react';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const modalClassNames = isOpen ? `${styles.modal} ${styles.open}` : styles.modal;

  return (
    <div className={modalClassNames}>
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modal_Header}>
          <div className={styles.text_Header}>
            <h1>{title}</h1>
          </div>
          <div onClick={onClose} className={styles.closeButton}>
            <Icon icon="ep:close-bold" className=" h-full w-full" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;