import { FC } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { TrashFill, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

import { MARKS_TO_COLORS_MAP, MARKS } from 'variables';

import styles from './answerList.module.scss';
import { IPropsAnswerList } from './model';

const AnswerList: FC<IPropsAnswerList> = ({
  answers,
  variants,
  isFinishedTest,
  onRemoveItemHandler,
}) => {
  return (
    <>
      <h4>Selected Pairs</h4>
      <ListGroup>
        {answers.map((item) => {
          const variantByPronoun = variants.find((variant) => {
            return variant.pronoun === item.pronoun;
          });

          return (
            <ListGroup.Item key={item.answerId} className={styles.item}>
              <span className={styles.result}>{`${item.pronoun} ${item.verb}`}</span>

              {isFinishedTest && !item.isCorrect && variantByPronoun ? (
                <span className={`${styles.resultCorrect}`}>
                  {`${variantByPronoun.pronoun} ${variantByPronoun.verb}`}
                </span>
              ) : null}

              {isFinishedTest ? (
                <span>
                  {item.isCorrect ? (
                    <CheckCircleFill color={MARKS_TO_COLORS_MAP[MARKS.FINE]} size={24} />
                  ) : (
                    <XCircleFill color={MARKS_TO_COLORS_MAP[MARKS.BAD]} size={24} />
                  )}
                </span>
              ) : null}

              {!isFinishedTest ? (
                <Button variant="dark" onClick={onRemoveItemHandler(item.answerId)}>
                  <TrashFill size={14} />
                </Button>
              ) : null}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};

export default AnswerList;
