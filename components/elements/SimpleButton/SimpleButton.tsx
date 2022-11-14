import { FC } from 'react';

import Button from 'react-bootstrap/Button';

// import styles from './simpleButton.module.scss';
import { IPropsSimpleButton } from './model';

const SimpleButton: FC<IPropsSimpleButton> = ({ title, onClick, disabled = false }) => {
  return (
    <Button variant="dark" type="button" className="w-100" onClick={onClick} disabled={disabled}>
      {title}
    </Button>
  );
};

export default SimpleButton;
