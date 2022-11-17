import { IFinishRoundVerbResults } from 'types';
import { getAverageMark } from 'utils';

const getCalculatedMark = (results: IFinishRoundVerbResults[]): number => {
  if (!results.length) {
    return 0;
  }

  return getAverageMark(results.map((item) => item.mark));
};

const removeCardFinishResults = (
  id: string,
  prevData: IFinishRoundVerbResults[]
): IFinishRoundVerbResults[] => {
  const filteredItems = prevData.filter((item) => item.id !== id);
  return [...filteredItems];
};

const Helpers = {
  getCalculatedMark,
  removeCardFinishResults,
};

export default Helpers;
