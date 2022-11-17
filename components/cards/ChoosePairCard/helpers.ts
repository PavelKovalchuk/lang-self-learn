import { IVerbData, IVerbAnswer } from 'types';
import { shuffleArray } from 'utils';
import { DefaultAnswer } from './constants';

import { IShuffledData } from './model';

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
  answers: IVerbAnswer[],
  variants: IVerbData[]
): { results: IVerbAnswer[]; corrects: number } => {
  let corrects = 0;
  const results: IVerbAnswer[] = answers.map((answer) => {
    const availableVerbs = variants.filter((item) => {
      return item.verb === answer.verb && item.pronoun === answer.pronoun;
    });
    const isCorrect = !!availableVerbs.length;

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

const getCurrentAnswerByPronounToSave = (
  {
    pairId,
    pronoun,
  }: {
    pairId: string;
    pronoun: string;
  },
  prevCurrentAnswer: IVerbAnswer | null
): IVerbAnswer => {
  if (!prevCurrentAnswer) {
    return {
      ...DefaultAnswer,
      pronoun,
      pronounIdPair: pairId,
    };
  }
  return { ...prevCurrentAnswer, pronoun, pronounIdPair: pairId };
};

const getCurrentAnswerByVerbToSave = (
  {
    pairId,
    verb,
  }: {
    pairId: string;
    verb: string;
  },
  prevCurrentAnswer: IVerbAnswer | null
): IVerbAnswer => {
  if (!prevCurrentAnswer) {
    return {
      ...DefaultAnswer,
      verb,
      verbIdPair: pairId,
    };
  }
  return { ...prevCurrentAnswer, verb, verbIdPair: pairId };
};

const Helpers = {
  getShuffledData,
  getCalculatedMark,
  getFinishedAnswers,
  analyzeAnswers,
  getCurrentAnswerByPronounToSave,
  getCurrentAnswerByVerbToSave,
};

export default Helpers;
