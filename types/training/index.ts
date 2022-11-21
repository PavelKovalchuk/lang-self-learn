export interface IUserTraining {
  date: string; // calculated on the backend
  points: number;
  type: string;
}

export interface IUserTrainingData {
  language: string;
  userId: number;
  lastUpdated: string; // calculated on the backend
  averagePoints: number | null;
  trainings: IUserTraining[];
}
