import { IUserTrainingDocument } from 'types';
import { getFrontendFormatDate } from 'utils';
import { NAMES_TO_TRAINING_TYPES_MAP } from 'variables';

import { IStatisticsData } from './model';

const getSortedStatistics = (userTraining?: IUserTrainingDocument): IStatisticsData => {
  const result: IStatisticsData = {};

  userTraining?.trainings.forEach((item) => {
    const date = getFrontendFormatDate(item.date);

    if (!result?.[date]) {
      result[date] = { date, sumPoints: item.points, sumTrainings: 1, trainings: {} };

      if (!result[date].trainings?.[item.type]) {
        result[date].trainings = {
          ...result[date].trainings,
          [item.type]: { points: item.points, type: NAMES_TO_TRAINING_TYPES_MAP[item.type] },
        };
      }
    } else {
      result[date].sumPoints += item.points;
      result[date].sumTrainings += 1;

      if (!result[date].trainings?.[item.type]) {
        result[date].trainings = {
          ...result[date].trainings,
          [item.type]: { points: item.points, type: NAMES_TO_TRAINING_TYPES_MAP[item.type] },
        };
      } else {
        result[date].trainings = {
          ...result[date].trainings,
          [item.type]: {
            points: result[date].trainings[item.type].points + item.points,
            type: NAMES_TO_TRAINING_TYPES_MAP[item.type],
          },
        };
      }
    }
  });

  return result;
};

const Helpers = {
  getSortedStatistics,
};

export default Helpers;
