import { IUserTrainingDocument } from 'types';

/* eslint-disable no-unused-vars */

export interface IStatisticsData {
  [date: string]: {
    date: string;
    sumPoints: number;
    sumTrainings: number;
    trainings: { [type: string]: { points: number; type: string } };
  };
}

export interface IPropsTrainingStatistics {
  userTraining?: IUserTrainingDocument;
}
