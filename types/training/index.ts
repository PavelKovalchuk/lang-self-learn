export interface IUserTraining {
  date: Date; // calculated on the backend
  points: number;
  type: string;
}

export interface IUserTrainingData {
  language: string;
  userId: number;
  lastUpdated: Date; // calculated on the backend
  sumPoints: number; // calculated on the backend
  trainings: IUserTraining[];
}
