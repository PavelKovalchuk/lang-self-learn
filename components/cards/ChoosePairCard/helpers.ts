import { IVerbData, IShuffledData, IVerbAnswer } from 'types';
import { shuffleArray } from 'utils';

const getShuffledData = (variants: IVerbData[]): IShuffledData => {
  return {
    pronouns: shuffleArray(
      variants.map((variant) => ({
        text: variant.pronoun,
        pairId: variant.id,
      }))
    ),
    verbs: shuffleArray(
      variants.map((variant) => ({
        text: variant.verb,
        pairId: variant.id,
      }))
    ),
  };
};

const getCalculatedMark = (correctAnswers: number, numberVariants: number): number => {
  const percentage = (correctAnswers / numberVariants) * 100;
  if (percentage < 30 && percentage >= 0) {
    return 1;
  }
  if (percentage < 50 && percentage > 30) {
    return 2;
  }
  if (percentage < 70 && percentage > 50) {
    return 3;
  }
  if (percentage < 90 && percentage > 70) {
    return 4;
  }
  return 5;
};

const getFinishedAnswers = (
  answers: IVerbAnswer[]
): { results: IVerbAnswer[]; corrects: number } => {
  let corrects = 0;
  const results: IVerbAnswer[] = answers.map((answer) => {
    const isCorrect = answer.verbIdPair === answer.pronounIdPair;
    if (isCorrect) {
      corrects += 1;
    }

    return {
      ...answer,
      isCorrect,
    };
  });

  return { corrects, results };
};

const analyzeAnswers = (answers: IVerbAnswer[], answerId: string): IVerbAnswer[] => {
  return answers
    .filter((item) => {
      return item.answerId !== answerId;
    })
    .map((item, index) => {
      return { ...item, answerId: String(index + 1) };
    });
};

const Helpers = {
  getShuffledData,
  getCalculatedMark,
  getFinishedAnswers,
  analyzeAnswers,
};

export default Helpers;
