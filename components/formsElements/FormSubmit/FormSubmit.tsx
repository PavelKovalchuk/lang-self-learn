import { FC } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

// import styles from './formTitle.module.scss';
import { IPropsFormSubmit } from './model';

const FormSubmit: FC<IPropsFormSubmit> = ({
  title,
  isActiveSubmit,
  withLoading = false,
  isLoading = false,
}) => {
  return (
    <Row data-test="FormSubmit">
      <Col sm={{ span: 6, offset: 3 }}>
        <Button variant="dark" type="submit" className="w-100" disabled={!isActiveSubmit}>
          {withLoading && isLoading ? (
            <Spinner
              as="span"
              className="me-2"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : null}

          {title}
        </Button>
      </Col>
    </Row>
  );
};

export default FormSubmit;
