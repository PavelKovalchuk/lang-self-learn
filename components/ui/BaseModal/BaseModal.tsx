import { FC } from 'react';
import { SimpleButton } from 'components/elements';
import Modal from 'react-bootstrap/Modal';

// import styles from './baseModal.module.scss';
import { IPropsBaseModal } from './model';

const BaseModal: FC<IPropsBaseModal> = ({ title, isShown, onClose, children }) => {
  return (
    <Modal show={isShown} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <SimpleButton title="Close" onClick={onClose} />
      </Modal.Footer>
    </Modal>
  );
};

export default BaseModal;
