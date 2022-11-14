import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { IVerbAnswer } from 'types';

import { AnswerList, CardMark, VariantsList } from 'components/elements';

// import styles from './choosePairCard.module.scss';
import { IPropsChoosePairCard, IShuffledData } from './model';
import Helpers from './helpers';
import { DefaultAnswer } from './constants';

const ChoosePairCard: FC<IPropsChoosePairCard> = ({ verbData }) => {
  const [answers, setAnswers] = useState<IVerbAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<IVerbAnswer | null>(null);
  const [shuffledData, setShuffledData] = useState<IShuffledData | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const isFinishedTest = useMemo(() => {
    return answers.length === verbData.verbs.length;
  }, [answers, verbData.verbs.length]);

  const mark = useMemo(() => {
    if (!isFinishedTest) {
      return 0;
    }
    return Helpers.getCalculatedMark(correctAnswers, verbData.verbs.length);
  }, [correctAnswers, verbData.verbs.length, isFinishedTest]);

  useEffect(() => {
    setShuffledData(Helpers.getShuffledData(verbData.verbs));
  }, []);

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

  const onFinishTestHandler = useCallback(() => {
    const { corrects, results } = Helpers.getFinishedAnswers(answers);
    setAnswers(results);
    setCorrectAnswers(corrects);
  }, [answers]);

  useEffect(() => {
    if (isFinishedTest) {
      onFinishTestHandler();
    }
  }, [isFinishedTest]);

  const onClickPronounHandler = useCallback(
    (pairId: string, pronoun: string) => () => {
      setCurrentAnswer((prevCurrentAnswer) => {
        if (!prevCurrentAnswer) {
          return {
            ...DefaultAnswer,
            pronoun,
            pronounIdPair: pairId,
          };
        }
        return { ...prevCurrentAnswer, pronoun, pronounIdPair: pairId };
      });
    },
    []
  );

  const onClickVerbHandler = useCallback(
    (pairId: string, verb: string) => () => {
      setCurrentAnswer((prevCurrentAnswer) => {
        if (!prevCurrentAnswer) {
          return {
            ...DefaultAnswer,
            verb,
            verbIdPair: pairId,
          };
        }
        return { ...prevCurrentAnswer, verb, verbIdPair: pairId };
      });
    },
    []
  );

  const onClickAnswerHandler = useCallback(
    (answerId: string) => () => {
      setAnswers(Helpers.analyzeAnswers(answers, answerId));
    },
    [answers]
  );

  const onClickResetHandler = useCallback(() => {
    setCurrentAnswer(null);
    setAnswers([]);
  }, []);

  return (
    <Row>
      <Col sm={12}>
        <Button variant="dark" onClick={onClickResetHandler} disabled={!answers.length}>
          Reset
        </Button>
      </Col>

      {isFinishedTest ? (
        <Col sm={12}>
          <CardMark mark={mark} correctAnswer={correctAnswers} allAnswer={answers.length} />
        </Col>
      ) : null}

      {answers.length ? (
        <Col sm={12}>
          <AnswerList
            answers={answers}
            variants={verbData.verbs}
            isFinishedTest={isFinishedTest}
            onRemoveItemHandler={onClickAnswerHandler}
          />
        </Col>
      ) : null}

      <Col sm={12}>
        <div>
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
        </div>
      </Col>
    </Row>
  );
};

export default ChoosePairCard;
