import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

// import styles from './pronounVerb.module.scss';
import { IPropsPronounVerb } from './model';

const PronounVerb: FC<IPropsPronounVerb> = ({
  id,
  pronoun,
  pronounTranslation,
  saveVerbHandler,
  isToClear,
}) => {
  const [verb, setVerb] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');

  useEffect(() => {
    if (isToClear) {
      setVerb('');
      setTranslation('');
    }
  }, [isToClear]);

  const onChangeVerb = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setVerb(e.currentTarget.value);
  }, []);

  const onChangeTranslation = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTranslation(e.currentTarget.value);
  }, []);

  return (
    <Row id={`pronoun-data-${id}`} className="mb-3">
      <Col sm={2}>
        <Form.Control
          name="pronoun"
          type="text"
          placeholder="Pronoun"
          aria-label="pronoun"
          value={`${pronoun} [${pronounTranslation}]`}
          readOnly
        />
      </Col>
      <Col sm={5}>
        <Form.Control
          name="verb"
          type="text"
          placeholder="Verb"
          aria-label="verb"
          value={verb}
          onChange={onChangeVerb}
          onBlur={saveVerbHandler(id, verb, translation)}
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
          onBlur={saveVerbHandler(id, verb, translation)}
        />
      </Col>
    </Row>
  );
};

export default PronounVerb;
