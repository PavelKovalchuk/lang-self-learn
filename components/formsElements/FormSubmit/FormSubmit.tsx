import { FC } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// import styles from './formTitle.module.scss';
import { IPropsFormSubmit } from './model';

const FormSubmit: FC<IPropsFormSubmit> = ({ title, isActiveSubmit }) => {
  return (
    <Row data-test="FormSubmit">
      <Col sm={{ span: 6, offset: 3 }}>
        <Button variant="dark" type="submit" className="w-100" disabled={!isActiveSubmit}>
          {title}
        </Button>
      </Col>
    </Row>
  );
};

export default FormSubmit;
