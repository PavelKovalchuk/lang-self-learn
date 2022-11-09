import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

// import styles from './wordTranslationData.module.scss';
import { IPropsWordTranslationData } from './model';

const WordTranslationData: FC<IPropsWordTranslationData> = ({
  id,
  saveWordHandler,
  wordAriaLabel,
  wordPlaceholder,
  isToClear,
}) => {
  const [word, setWord] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');

  useEffect(() => {
    if (isToClear) {
      setWord('');
      setTranslation('');
    }
  }, [isToClear]);

  const onChangeWord = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.currentTarget.value);
  }, []);

  const onChangeTranslation = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTranslation(e.currentTarget.value);
  }, []);

  return (
    <Row id={`word-data-${id}`}>
      <Col sm={6}>
        <Form.Control
          name="word"
          type="text"
          placeholder={wordPlaceholder}
          aria-label={wordAriaLabel}
          value={word}
          onChange={onChangeWord}
          onBlur={saveWordHandler(word, translation, id)}
        />
      </Col>
      <Col sm={6}>
        <Form.Control
          name="translation"
          type="text"
          placeholder="Translation"
          aria-label="translation"
          value={translation}
          onChange={onChangeTranslation}
          onBlur={saveWordHandler(word, translation, id)}
        />
      </Col>
    </Row>
  );
};

export default WordTranslationData;
