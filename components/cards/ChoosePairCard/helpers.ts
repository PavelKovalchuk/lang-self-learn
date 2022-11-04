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

const Helpers = {
  getShuffledData,
};

export default Helpers;
