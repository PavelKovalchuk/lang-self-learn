import { IVerbData, IVerbAnswer, IFinishRoundVerbResults } from 'types';
import { shuffleArray } from 'utils';
import { MARKS, POINT_RATIOS } from 'variables';
import { DefaultAnswer } from './constants';

import { IFinishRoundVerbResultsParam, IShuffledData } from './model';

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

  if (percentage < 10 && percentage >= 0) {
    return MARKS.TERRIBLE;
  }
  if (percentage < 40 && percentage > 10) {
    return MARKS.BAD;
  }
  if (percentage < 60 && percentage > 40) {
    return MARKS.MEDIUM;
  }
  if (percentage < 80 && percentage > 60) {
    return MARKS.GOOD;
  }
  return MARKS.FINE;
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

const getFinishRoundVerbResults = ({
  answers,
  mark,
  correctAnswers,
  verbData,
}: IFinishRoundVerbResultsParam): IFinishRoundVerbResults => {
  return {
    mark,
    id: verbData._id,
    title: verbData.indefinite.verb,
    questions: answers.length,
    corrects: correctAnswers,
    points: POINT_RATIOS.CHOOSE_PAIR_CARD * correctAnswers,
  };
};

const Helpers = {
  getShuffledData,
  getCalculatedMark,
  getFinishedAnswers,
  analyzeAnswers,
  getCurrentAnswerByPronounToSave,
  getCurrentAnswerByVerbToSave,
  getFinishRoundVerbResults,
};

export default Helpers;
