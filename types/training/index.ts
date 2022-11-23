export interface IUserTraining {
  date: string | Date; // calculated on the backend
  points: number;
  type: string;
}

export interface IUserTrainingData {
  language: string;
  userId: number;
  lastUpdated: string | Date; // calculated on the backend
  sumPoints: number; // calculated on the backend
  trainings: IUserTraining[];
}
