import ReactDOM from 'react-dom';
import { FC, useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

// import styles from './toastModal.module.scss';
import { IPropsToastModal } from './model';

const ToastModal: FC<IPropsToastModal> = ({ title, message, type, isShown, onClose }) => {
  const [elementToRender, setElementToRender] = useState<any>(null);

  useEffect(() => {
    const element = window.document.getElementById('notifications');
    setElementToRender(element);
  }, []);

  return elementToRender
    ? ReactDOM.createPortal(
        <ToastContainer className="p-3" containerPosition="fixed" position="top-start">
          <Toast show={isShown} onClose={onClose} bg={type} delay={9000} autohide>
            <Toast.Header>
              <strong className="me-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>,
        elementToRender
      )
    : null;
};

export default ToastModal;
