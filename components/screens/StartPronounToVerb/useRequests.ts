import { useCallback } from 'react';

import { IBaseApiResponse, IUserTrainingData, IVerbsTrainedData } from 'types';

import { DefaultToastMessage } from './constants';
import Helpers from './helpers';
import { IUseRequestsParam, IUseRequestsResult } from './model';

const useRequests = ({
  language,
  userId,
  setVerbs,
  setToastModalResult,
}: IUseRequestsParam): IUseRequestsResult => {
  const loadVerbsHandler = useCallback(async (groupsIds: string[], customGroupsIds: string[]) => {
    const { result, payload }: IBaseApiResponse = await Helpers.makeSubmitRequest({
      language,
      userId: String(userId),
      selectedVerbsGroupsIds: groupsIds,
      customGroupsIds,
    });

    if (result === 'ok') {
      setVerbs(payload);
    }
  }, []);

  const updateVerbsHandler = useCallback(async (verbsToUpdate: IVerbsTrainedData[]) => {
    const { result }: IBaseApiResponse = await Helpers.makeSaveTrainingsRequest({
      language,
      verbsToUpdate,
    });

    if (result !== 'ok') {
      setToastModalResult({ ...DefaultToastMessage, type: 'danger', message: 'Error occurs.' });
    }
  }, []);

  const updateUserTrainingsHandler = useCallback(async (data: IUserTrainingData) => {
    const { result }: IBaseApiResponse = await Helpers.makeSaveUserTrainingsRequest({
      data,
    });

    if (result !== 'ok') {
      setToastModalResult({ ...DefaultToastMessage, type: 'danger', message: 'Error occurs.' });
    }
  }, []);

  return { loadVerbsHandler, updateVerbsHandler, updateUserTrainingsHandler };
};

export default useRequests;
