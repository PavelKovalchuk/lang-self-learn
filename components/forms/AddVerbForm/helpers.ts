import { IBaseApiResponse, IPronounData, IVerbData } from 'types';
import { postRequest } from 'utils';
import { HTTP_REQUEST_URL } from 'variables';

import { IIndefiniteVerbData } from 'components/formsElements/IndefiniteVerb';

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

const getPronounsToSave = (
  {
    verbTranslation,
    verb,
    id,
  }: {
    id: string;
    verb: string;
    verbTranslation: string;
  },
  pronounData: IPronounData,
  prevVerbs: IVerbData[]
): IVerbData[] => {
  const verbToEdit = prevVerbs.find((item) => {
    return item.id === id;
  });
  if (verbToEdit) {
    return [
      ...prevVerbs.filter((item) => item.id !== id),
      { ...verbToEdit, verb, verbTranslation },
    ];
  }
  return [
    ...prevVerbs,
    {
      pronoun: pronounData.pronoun,
      pronounTranslation: pronounData.translation,
      verb: verb.trim(),
      verbTranslation: verbTranslation.trim(),
      id: String(prevVerbs.length + 1),
    },
  ];
};

const getSelectedVerbsGroupsIdsToSave = (id: string, prevData: string[]): string[] => {
  const filteredItems = prevData.filter((item) => item !== id);
  if (filteredItems.length !== prevData.length) {
    return [...filteredItems];
  }
  return [...prevData, id];
};

const makeSubmitRequest = async ({
  language,
  userId,
  indefinite,
  verbs,
  selectedVerbsGroupsIds,
  pronounsGroupId,
}: {
  language: string;
  userId: number;
  indefinite: IIndefiniteVerbData;
  verbs: IVerbData[];
  selectedVerbsGroupsIds: string[];
  pronounsGroupId: string;
}): Promise<IBaseApiResponse> => {
  const result = await postRequest(HTTP_REQUEST_URL.VERBS, {
    params: {
      language,
    },
    data: {
      userId,
      indefinite,
      verbs,
      selectedVerbsGroupsIds,
      pronounsGroupId,
    },
  });

  return result;
};

const Helpers = {
  checkActiveSubmit,
  getPronounsToSave,
  getSelectedVerbsGroupsIdsToSave,
  makeSubmitRequest,
};

export default Helpers;
