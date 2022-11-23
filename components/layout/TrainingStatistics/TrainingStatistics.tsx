import { FC, useMemo } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { TRAININGS_DAYS_TO_KEEP } from 'variables';
import { getFrontendFormatDate } from 'utils';

// import styles from './trainingStatistics.module.scss';
import { IPropsTrainingStatistics } from './model';
import Helpers from './helpers';

const TrainingStatistics: FC<IPropsTrainingStatistics> = ({ userTraining }) => {
  const statisticsData = useMemo(() => {
    return Helpers.getSortedStatistics(userTraining);
  }, [userTraining]);

  return userTraining ? (
    <>
      <Row data-test="TrainingStatistics">
        <Col sm={12} md="auto">
          <h5>{`Statistics for the last ${TRAININGS_DAYS_TO_KEEP} days`}</h5>
          <p>{`Last trained ${getFrontendFormatDate(userTraining.lastUpdated)}`}</p>
        </Col>
      </Row>
      <Row data-test="TrainingStatistics">
        {Object.values(statisticsData).map((item) => {
          return (
            <Col key={item.date} sm={12} md="auto">
              <div className="border border-1 border-dark p-1">
                <h5>{item.date}</h5>
                <div>{`Points: ${item.sumPoints}`}</div>
                <div>{`Rounds: ${item.sumTrainings}`}</div>
                <div>
                  {'Trainings points: '}
                  <ol>
                    {Object.values(item.trainings).map((training) => {
                      return <li key={training.type}>{`${training.type}: ${training.points}`}</li>;
                    })}
                  </ol>
                </div>
              </div>
            </Col>
          );
        })}
        <Col sm={12} md="auto">
          <div className="border border-1 border-dark p-1">
            <h5>Summary</h5>
            <div>{`Points: ${userTraining.sumPoints}`}</div>
            <div>{`Rounds: ${userTraining.trainings.length}`}</div>
          </div>
        </Col>
      </Row>
    </>
  ) : null;
};

export default TrainingStatistics;
