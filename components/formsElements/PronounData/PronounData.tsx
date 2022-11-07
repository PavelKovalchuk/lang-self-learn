import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// import styles from './pronounData.module.scss';
import { IPropsPronounData } from './model';

const PronounData: FC<IPropsPronounData> = () => {
  // const [answers, setAnswers] = useState<IVerbAnswer[]>([]);

  // Add new component - for the pair

  return (
    <Row>
      <Col sm={5}>
        <Form.Control name="pronoun" type="text" placeholder="Pronoun" aria-label="pronoun" />
        <Form.Text className="text-muted">Add a pronoun</Form.Text>
      </Col>
      <Col sm={5}>
        <Form.Control
          name="translation"
          type="text"
          placeholder="Translation"
          aria-label="translation"
        />
        <Form.Text className="text-muted">Add a translation</Form.Text>
      </Col>
      <Col sm={2}>
        <Button variant="dark" type="button">
          Add new pair
        </Button>
      </Col>
    </Row>
  );
};

export default PronounData;
