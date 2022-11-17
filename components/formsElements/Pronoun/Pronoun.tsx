import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { SimpleButton } from 'components/elements';

// import styles from './pronoun.module.scss';
import { IPropsPronoun } from './model';

const Pronoun: FC<IPropsPronoun> = ({
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
    <Row data-test="Pronoun" id={`pronoun-data-${id}`} className="mb-3">
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
      </Col>
      <Col sm={2}>
        <SimpleButton title="Delete" onClick={deletePronounHandler(id)} />
      </Col>
    </Row>
  );
};

export default Pronoun;
