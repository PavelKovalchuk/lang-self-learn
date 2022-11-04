import { IRegularVerbVariant, IShuffledData } from 'types';
import { shuffleArray } from 'utils';

const getShuffledData = (variants: IRegularVerbVariant[]): IShuffledData => {
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
  if (percentage < 30 && percentage > 0) {
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

const Helpers = {
  getShuffledData,
  getCalculatedMark,
};

export default Helpers;
