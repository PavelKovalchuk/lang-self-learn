import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// import styles from './pronounData.module.scss';
import { IPropsPronounData } from './model';

const PronounData: FC<IPropsPronounData> = ({
  id,
  pronounSaved,
  translationSaved,
  savePronounHandler,
  deletePronounHandler,
}) => {
  const [pronoun, setPronoun] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');

  useEffect(() => {
    setPronoun(pronounSaved);
    setTranslation(translationSaved);
  }, []);

  const onChangePronoun = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPronoun(e.currentTarget.value);
  }, []);

  const onChangeTranslation = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTranslation(e.currentTarget.value);
  }, []);

  return (
    <Row id={`pronoun-data-${id}`}>
      <Col sm={5}>
        <Form.Control
          name="pronoun"
          type="text"
          placeholder="Pronoun"
          aria-label="pronoun"
          value={pronoun}
          onChange={onChangePronoun}
          onBlur={savePronounHandler(id, pronoun, translation)}
        />
        <Form.Text className="text-muted">Add a pronoun</Form.Text>
      </Col>
      <Col sm={5}>
        <Form.Control
          name="translation"
          type="text"
          placeholder="Translation"
          aria-label="translation"
          value={translation}
          onChange={onChangeTranslation}
          onBlur={savePronounHandler(id, pronoun, translation)}
        />
        <Form.Text className="text-muted">Add a translation</Form.Text>
      </Col>
      <Col sm={2}>
        <Button variant="dark" type="button" onClick={deletePronounHandler(id)}>
          Delete
        </Button>
      </Col>
    </Row>
  );
};

export default PronounData;
