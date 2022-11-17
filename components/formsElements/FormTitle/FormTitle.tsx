import { FC } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import styles from './formTitle.module.scss';
import { IPropsFormTitle } from './model';

const FormTitle: FC<IPropsFormTitle> = ({ title }) => {
  return (
    <Row data-test="FormTitle">
      <Col sm={12}>
        <h2>{title}</h2>
      </Col>
    </Row>
  );
};

export default FormTitle;
