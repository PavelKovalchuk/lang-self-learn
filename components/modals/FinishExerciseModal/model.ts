export interface IPropsFinishExerciseModal {
  isShown: boolean;
  onClose: () => void;
  results: { title: string; mark: number }[];
  questions: number;
  corrects: number;
  points: number;
  averageMark: number;
}
