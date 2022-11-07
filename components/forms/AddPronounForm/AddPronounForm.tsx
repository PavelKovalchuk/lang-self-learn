import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { PronounData } from 'components/formsElements';

// import styles from './addPronounForm.module.scss';
import { IPropsAddPronounForm } from './model';

const AddPronounForm: FC<IPropsAddPronounForm> = () => {
  // const [answers, setAnswers] = useState<IVerbAnswer[]>([]);

  // Add new component - for the pair

  return (
    <Form>
      <Row>
        <Col sm={12}>
          <h2>Add a pronoun data to your dictionary</h2>
        </Col>
      </Row>
      <PronounData />
      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddPronounForm;
