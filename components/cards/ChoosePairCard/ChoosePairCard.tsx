import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { AnswerList, VariantsList } from 'components/elements';
import { IShuffledData, IVerbAnswer } from 'types';

// import styles from './choosePairCard.module.scss';
import { IPropsChoosePairCard } from './model';
import Helpers from './helpers';
import { DefaultAnswer } from './constants';

const ChoosePairCard: FC<IPropsChoosePairCard> = ({ verbData }) => {
  const [answers, setAnswers] = useState<IVerbAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<IVerbAnswer | null>(null);
  const [shuffledData, setShuffledData] = useState<IShuffledData | null>(null);

  const isFinishedTest = useMemo(() => {
    return answers.length === verbData.variants.length;
  }, [answers, verbData.variants.length]);

  const onFinishTestHandler = useCallback(() => {
    const results: IVerbAnswer[] = answers.map((answer) => {
      return {
        ...answer,
        isCorrect: answer.verbIdPair === answer.pronounIdPair,
      };
    });

    setAnswers(results);
  }, [answers]);

  useEffect(() => {
    setShuffledData(Helpers.getShuffledData(verbData.variants));
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
      const newAnswers = answers
        .filter((item) => {
          return item.answerId !== answerId;
        })
        .map((item, index) => {
          return { ...item, answerId: String(index + 1) };
        });

      setAnswers(newAnswers);
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
        <Button variant="primary" onClick={onClickResetHandler} disabled={!answers.length}>
          Reset
        </Button>
      </Col>

      {answers.length ? (
        <AnswerList
          answers={answers}
          variants={verbData.variants}
          isFinishedTest={isFinishedTest}
          onRemoveItemHandler={onClickAnswerHandler}
        />
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
