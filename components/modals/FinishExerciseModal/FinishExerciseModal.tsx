import { FC } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import { MARKS_TO_ICONS_MAP } from 'variables';

import { BaseModal } from 'components/ui';

import styles from './finishExerciseModal.module.scss';
import { IPropsFinishExerciseModal } from './model';

const FinishExerciseModal: FC<IPropsFinishExerciseModal> = ({
  isShown,
  onClose,
  results,
  questions,
  corrects,
  averageMark,
  points,
}) => {
  return (
    <BaseModal title="Result of the round" isShown={isShown} onClose={onClose}>
      <Row data-test="FinishExerciseModal">
        <Col sm={12} className="mb-3">
          <ListGroup>
            {results.map((item) => {
              return (
                <ListGroup.Item key={item.title} className={styles.item}>
                  <span className={styles.result}>{item.title}</span>
                  <span>{MARKS_TO_ICONS_MAP[item.mark]}</span>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col sm={12} className="mb-3">
          <div className={styles.summary}>
            <p>Round Questions</p>
            <div>{questions}</div>
          </div>
          <div className={styles.summary}>
            <p>Round Correct Answers</p>
            <div>{corrects}</div>
          </div>
          <div className={styles.summary}>
            <p>Round Average Mark</p>
            <div>{averageMark}</div>
          </div>
          <div className={styles.summary}>
            <p>Earned Points</p>
            <div>{points}</div>
          </div>
        </Col>
      </Row>
    </BaseModal>
  );
};

export default FinishExerciseModal;
