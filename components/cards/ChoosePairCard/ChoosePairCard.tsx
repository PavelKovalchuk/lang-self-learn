import { FC, MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import { EmojiSunglasses, EmojiFrown } from 'react-bootstrap-icons';

// import styles from './choosePairCard.module.scss';
import { IAnswer, IPropsChoosePairCard, IShuffledData } from './model';
import Helpers from './helpers';
import { DefaultAnswer } from './constants';

const ChoosePairCard: FC<IPropsChoosePairCard> = ({ verbData }) => {
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<IAnswer | null>(null);
  const [shuffledData, setShuffledData] = useState<IShuffledData | null>(null);

  const onFinishTestHandler = useCallback(() => {
    const results: IAnswer[] = answers.map((answer) => {
      return {
        ...answer,
        isCorrect: answer.verbIdPair === answer.pronounIdPair,
      };
    });

    setAnswers(results);
  }, [answers]);

  const isFinishedTest = useMemo(() => {
    return answers.length === verbData.variants.length;
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
    if (answers.length === verbData.variants.length) {
      onFinishTestHandler();
    }
  }, [answers.length]);

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

  const onClickResetHandler = useCallback(() => {
    setCurrentAnswer(null);
    setAnswers([]);
  }, []);

  console.log('answers', answers);
  console.log('--------- ChoosePairCard props.shuffledData', shuffledData);

  return (
    <Row>
      <Col sm={12}>
        <Button variant="primary" onClick={onClickResetHandler} disabled={!answers.length}>
          Reset
        </Button>
      </Col>

      {answers.length ? (
        <Col sm={12}>
          <h4>Selected Pairs</h4>
          <ListGroup>
            {answers.map((item) => {
              const variantByPronoun = verbData.variants.find((variant) => {
                return variant.pronoun === item.pronoun;
              });

              return (
                <ListGroup.Item key={item.answerId}>
                  <span className="ms-2 me-auto">
                    {item.pronoun} {item.verb}
                  </span>

                  {isFinishedTest && !item.isCorrect && variantByPronoun ? (
                    <span className="ms-2 me-auto">
                      <Alert variant="info">
                        {variantByPronoun.pronoun} {variantByPronoun.verb}
                      </Alert>
                    </span>
                  ) : null}

                  {isFinishedTest ? (
                    <Badge bg={item.isCorrect ? 'success' : 'danger'} pill>
                      {item.isCorrect ? <EmojiSunglasses size={24} /> : <EmojiFrown size={24} />}
                    </Badge>
                  ) : null}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      ) : null}

      <Col sm={12}>
        <div>
          {shuffledData?.pronouns?.length ? (
            <ButtonGroup aria-label="pronouns" vertical>
              {shuffledData.pronouns.map((item) => {
                const answerData: IAnswer | undefined = answers.find(
                  (answer) => answer.pronoun === item.text
                );
                const isSelected = Boolean(answerData);
                const isCurrent = currentAnswer?.pronoun === item.text;
                const variant = Helpers.getButtonVariants(isCurrent, answerData);

                return (
                  <Button
                    key={item.text}
                    variant={variant}
                    onClick={onClickPronounHandler(item.pairId, item.text)}
                    disabled={isSelected}
                  >
                    {item.text}
                  </Button>
                );
              })}
            </ButtonGroup>
          ) : null}

          {shuffledData?.verbs?.length ? (
            <ButtonGroup aria-label="verbs" vertical>
              {shuffledData.verbs.map((item) => {
                const answerData: IAnswer | undefined = answers.find(
                  (answer) => answer.verb === item.text
                );
                const isSelected = Boolean(answerData);
                const isCurrent = currentAnswer?.verb === item.text;
                const variant = Helpers.getButtonVariants(isCurrent, answerData);

                return (
                  <Button
                    key={item.text}
                    variant={variant}
                    onClick={onClickVerbHandler(item.pairId, item.text)}
                    disabled={isSelected}
                  >
                    {item.text}
                  </Button>
                );
              })}
            </ButtonGroup>
          ) : null}
        </div>
      </Col>
    </Row>
  );
};

export default ChoosePairCard;
