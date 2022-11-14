import { FC } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import styles from './formTitle.module.scss';
import { IPropsFormActions } from './model';

/* eslint-disable react/no-array-index-key */

const FormActions: FC<IPropsFormActions> = ({ children }) => {
  let mdOffset = 6;
  if (children.length === 3) {
    mdOffset = 4;
  }

  return (
    <Row className="mb-4 mt-3">
      {children.map((child, index) => {
        return (
          <Col key={index.toString()} sm={12} md={mdOffset}>
            {child}
          </Col>
        );
      })}
    </Row>
  );
};

export default FormActions;
