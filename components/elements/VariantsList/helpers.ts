import { IVerbAnswer } from 'types';

const getButtonVariants = (isCurrent: boolean, answerData: IVerbAnswer | undefined): string => {
  if (isCurrent) {
    return 'warning';
  }

  if (answerData) {
    if (answerData.isCorrect) {
      return 'success';
    }
    if (answerData.isCorrect === false) {
      return 'danger';
    }
  }

  return 'dark';
};

const Helpers = {
  getButtonVariants,
};

export default Helpers;
