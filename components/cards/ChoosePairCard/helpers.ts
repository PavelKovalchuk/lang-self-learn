import { IRegularVerbVariant } from 'types';
import { shuffleArray } from 'utils';

import { IAnswer, IShuffledData } from './model';

const getButtonVariants = (isCurrent: boolean, answerData: IAnswer | undefined): string => {
  if (isCurrent) {
    return 'warning';
  }

  if (answerData) {
    if (answerData.isCorrect) {
      return 'success';
    } else if (answerData.isCorrect === false) {
      return 'danger';
    }
  }

  return 'dark';
};

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

const Helpers = {
  getButtonVariants,
  getShuffledData,
};

export default Helpers;
