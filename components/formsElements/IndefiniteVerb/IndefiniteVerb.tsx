import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

// import styles from './indefiniteVerb.module.scss';
import { IPropsIndefiniteVerb } from './model';

const IndefiniteVerb: FC<IPropsIndefiniteVerb> = ({ isToClear, saveIndefiniteHandler }) => {
  const [indefinite, setIndefinite] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');

  useEffect(() => {
    if (isToClear) {
      setIndefinite('');
      setTranslation('');
    }
  }, [isToClear]);

  const onChangeIndefinite = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIndefinite(e.currentTarget.value);
  }, []);

  const onChangeTranslation = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTranslation(e.currentTarget.value);
  }, []);

  return (
    <Row data-test="IndefiniteVerb" className="mb-5">
      <Col sm={{ span: 6, offset: 3 }} className="mb-2">
        <Form.Control
          name="indefiniteVerb"
          type="text"
          placeholder="Indefinite Verb"
          aria-label="Indefinite Verb"
          value={indefinite}
          onChange={onChangeIndefinite}
          onBlur={saveIndefiniteHandler(indefinite, translation)}
        />
      </Col>
      <Col sm={{ span: 6, offset: 3 }}>
        <Form.Control
          name="translation"
          type="text"
          placeholder="Translation"
          aria-label="translation"
          value={translation}
          onChange={onChangeTranslation}
          onBlur={saveIndefiniteHandler(indefinite, translation)}
        />
      </Col>
    </Row>
  );
};

export default IndefiniteVerb;
