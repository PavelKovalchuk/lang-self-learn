import { IIndefiniteVerbData, IVerbData, IWordTranslationData } from 'types';

interface ICheckActiveSubmitParam {
  verbs: IVerbData[];
  selectedVerbsGroupsIds: string[];
  pronounsGroupId: string;
  indefinite: IIndefiniteVerbData;
}

const checkActiveSubmit = ({
  verbs,
  selectedVerbsGroupsIds,
  pronounsGroupId,
  indefinite,
}: ICheckActiveSubmitParam): boolean => {
  let isSomeEmpty = false;

  if (
    !verbs.length ||
    !selectedVerbsGroupsIds.length ||
    !pronounsGroupId ||
    !indefinite.verb.trim() ||
    !indefinite.translation.trim()
  ) {
    return false;
  }

  verbs.forEach((item) => {
    if (!item?.verb.trim().length) {
      isSomeEmpty = true;
    }
    if (!item?.verbTranslation.trim().length) {
      isSomeEmpty = true;
    }
  });

  if (isSomeEmpty) {
    return !isSomeEmpty;
  }

  return true;
};

const Helpers = {
  checkActiveSubmit,
};

export default Helpers;
