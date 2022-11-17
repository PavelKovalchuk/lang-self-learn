import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { SimpleButton } from 'components/elements';

// import styles from './wordTranslationLabel.module.scss';
import { IPropsWordTranslationLabel } from './model';

const WordTranslationLabel: FC<IPropsWordTranslationLabel> = ({
  id,
  saveItemHandler,
  deleteItemHandler,
  wordAriaLabel,
  wordPlaceholder,
  wordSaved,
  labelSaved,
  translationSaved,
  isToClear,
  isToRestore,
}) => {
  const [word, setWord] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');
  const [label, setLabel] = useState<string>('');

  useEffect(() => {
    setWord(wordSaved);
    setTranslation(translationSaved);
    setLabel(labelSaved);
  }, []);

  useEffect(() => {
    if (isToClear) {
      setWord('');
      setTranslation('');
      setLabel('');
    }
  }, [isToClear]);

  useEffect(() => {
    if (isToRestore) {
      setWord(wordSaved);
      setTranslation(translationSaved);
      setLabel(labelSaved);
    }
  }, [isToRestore]);

  const onChangeWord = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.currentTarget.value);
  }, []);

  const onChangeTranslation = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTranslation(e.currentTarget.value);
  }, []);

  const onChangeLabel = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.currentTarget.value);
  }, []);

  return (
    <Row data-test="WordTranslationLabel" id={`word-data-${id}`} className="mb-3">
      <Col sm={4}>
        <Form.Control
          name="word"
          type="text"
          placeholder={wordPlaceholder}
          aria-label={wordAriaLabel}
          value={word}
          onChange={onChangeWord}
          onBlur={saveItemHandler({ word, translation, label, id })}
        />
      </Col>
      <Col sm={4}>
        <Form.Control
          name="translation"
          type="text"
          placeholder="Translation"
          aria-label="translation"
          value={translation}
          onChange={onChangeTranslation}
          onBlur={saveItemHandler({ word, translation, label, id })}
        />
      </Col>
      <Col sm={2}>
        <Form.Control
          name="label"
          type="text"
          placeholder="Label"
          aria-label="label"
          value={label}
          onChange={onChangeLabel}
          onBlur={saveItemHandler({ word, translation, label, id })}
        />
      </Col>
      <Col sm={2}>
        <SimpleButton title="Delete" onClick={deleteItemHandler(id)} />
      </Col>
    </Row>
  );
};

export default WordTranslationLabel;
