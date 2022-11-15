import { IBaseApiResponse, IVerbData } from 'types';
import { postRequest } from 'utils';
import { HTTP_REQUEST_URL } from 'variables';

import { IIndefiniteVerbData } from 'components/formsElements/IndefiniteVerb';

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
  getSelectedVerbsGroupsIdsToSave,
  makeSubmitRequest,
};

export default Helpers;
