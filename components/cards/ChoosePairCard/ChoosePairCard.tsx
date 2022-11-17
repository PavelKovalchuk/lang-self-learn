import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { IVerbAnswer } from 'types';
import { AnswerList, CardMark, SimpleButton, VariantsList } from 'components/elements';

// import styles from './choosePairCard.module.scss';
import { IPropsChoosePairCard, IShuffledData } from './model';
import Helpers from './helpers';

const ChoosePairCard: FC<IPropsChoosePairCard> = ({ verbData, onFinishCardHandler, isToReset }) => {
  const [answers, setAnswers] = useState<IVerbAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<IVerbAnswer | null>(null);
  const [shuffledData, setShuffledData] = useState<IShuffledData | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [mark, setMark] = useState<number>(0);

  const isFinishedTest = useMemo(() => {
    return answers.length === verbData.verbs.length;
  }, [answers, verbData.verbs.length]);

  const onClickResetHandler = useCallback(() => {
    setCurrentAnswer(null);
    setAnswers([]);
  }, []);

  useEffect(() => {
    setShuffledData(Helpers.getShuffledData(verbData.verbs));
  }, []);

  useEffect(() => {
    if (isToReset) {
      onClickResetHandler();
    }
  }, [isToReset]);

  useEffect(() => {
    if (!currentAnswer) {
      return;
    }
    if (currentAnswer.pronoun && currentAnswer.verb) {
      setAnswers((prevAnswers) => {
        return [...prevAnswers, { ...currentAnswer, answerId: String(prevAnswers.length + 1) }];
      });
      setCurrentAnswer(null);
    }
  }, [currentAnswer]);

  useEffect(() => {
    if (isFinishedTest) {
      const { corrects, results } = Helpers.getFinishedAnswers(answers, verbData.verbs);
      setAnswers(results);
      setCorrectAnswers(corrects);
      const calculatedMark = Helpers.getCalculatedMark(corrects, verbData.verbs.length);
      setMark(calculatedMark);
      onFinishCardHandler(calculatedMark);
    }
  }, [isFinishedTest]);

  const onClickPronounHandler = useCallback(
    (pairId: string, pronoun: string) => () => {
      setCurrentAnswer((prev) =>
        Helpers.getCurrentAnswerByPronounToSave({ pairId, pronoun }, prev)
      );
    },
    []
  );

  const onClickVerbHandler = useCallback(
    (pairId: string, verb: string) => () => {
      setCurrentAnswer((prev) => Helpers.getCurrentAnswerByVerbToSave({ pairId, verb }, prev));
    },
    []
  );

  const onClickAnswerHandler = useCallback(
    (answerId: string) => () => {
      setAnswers(Helpers.analyzeAnswers(answers, answerId));
    },
    [answers]
  );

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5" className="text-sm-center">
          {verbData.indefinite.verb}
        </Card.Title>
        <Card.Subtitle as="p" className="text-muted text-sm-center">
          {verbData.indefinite.translation}
        </Card.Subtitle>
      </Card.Header>

      <Card.Body>
        <Row>
          {isFinishedTest ? (
            <Col sm={12} className="mb-3">
              <CardMark mark={mark} correctAnswer={correctAnswers} allAnswer={answers.length} />
            </Col>
          ) : null}

          <Col sm={12} className="mb-3">
            <Row>
              <Col sm={12} className="mb-5 d-flex justify-content-sm-center">
                {shuffledData?.pronouns?.length ? (
                  <VariantsList
                    variantType="pronoun"
                    ariaLabelGroup="pronouns"
                    pairsData={shuffledData.pronouns}
                    onClickHandler={onClickPronounHandler}
                    currentAnswer={currentAnswer}
                    answers={answers}
                  />
                ) : null}
              </Col>
              <Col sm={12} className="d-flex justify-content-sm-center">
                {shuffledData?.verbs?.length ? (
                  <VariantsList
                    variantType="verb"
                    ariaLabelGroup="verbs"
                    pairsData={shuffledData.verbs}
                    onClickHandler={onClickVerbHandler}
                    currentAnswer={currentAnswer}
                    answers={answers}
                  />
                ) : null}
              </Col>
            </Row>
          </Col>

          {answers.length ? (
            <Col sm={{ span: 6, offset: 3 }} className="mb-3">
              <AnswerList
                answers={answers}
                variants={verbData.verbs}
                isFinishedTest={isFinishedTest}
                onRemoveItemHandler={onClickAnswerHandler}
              />
            </Col>
          ) : null}
        </Row>
      </Card.Body>

      <Card.Footer>
        <Row>
          <Col sm={{ span: 6, offset: 3 }} className="mb-3">
            <SimpleButton
              title="Reset Card"
              onClick={onClickResetHandler}
              disabled={!answers.length}
            />
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default ChoosePairCard;
