import {
  IBaseApiResponse,
  IFinishRoundVerbResults,
  IGroupsDataDocument,
  IUserTrainingData,
  IVerbsTrainedData,
} from 'types';
import {
  generateLocationQueryString,
  generateUrlParamsArray,
  getAverageMark,
  getRemovedParamFromLocationQueryString,
  getRequest,
  putRequest,
  setUrl,
} from 'utils';
import { HTTP_REQUEST_URL, TRAININGS_TYPE, URL_PARAMS } from 'variables';
import { ICalculatedData, IGetUserTrainingToUpdateParam } from './model';

const getSelectedVerbsGroupsIdsToSave = (id: string, prevData: string[]): string[] => {
  const filteredItems = prevData.filter((item) => item !== id);
  if (filteredItems.length !== prevData.length) {
    return [...filteredItems];
  }
  return [...prevData, id];
};

const getSelectedVerbsGroupsTitles = (
  isGroupsExists: boolean,
  verbsGroups: IGroupsDataDocument[],
  selectedVerbsGroupsIds: string[]
): string[] => {
  return isGroupsExists
    ? verbsGroups[0].groups
        .filter((item) => {
          return selectedVerbsGroupsIds.includes(item.id);
        })
        .map((item) => item.word)
    : [];
};

const getUrlToSet = (selectedVerbsGroupsIds: string[], pathname?: string): string | null => {
  if (!selectedVerbsGroupsIds.length) {
    return null;
  }

  return generateLocationQueryString(
    URL_PARAMS.VERBS_GROUPS,
    generateUrlParamsArray(selectedVerbsGroupsIds),
    pathname
  );
};

const setUrlParams = (selectedVerbsGroupsIds: string[]): void => {
  let url = getUrlToSet(selectedVerbsGroupsIds);

  if (!url) {
    url = getRemovedParamFromLocationQueryString(URL_PARAMS.VERBS_GROUPS);
  }

  setUrl(url || '');
};

const makeSubmitRequest = async ({
  language,
  userId,
  selectedVerbsGroupsIds,
}: {
  language: string;
  userId: string;
  selectedVerbsGroupsIds: string[];
}): Promise<IBaseApiResponse> => {
  const result = await getRequest(HTTP_REQUEST_URL.VERBS_BY_GROUPS, {
    language,
    userId,
    selectedVerbsGroupsIds,
  });

  return result;
};

const makeSaveTrainingsRequest = async ({
  language,
  verbsToUpdate,
}: {
  language: string;
  verbsToUpdate: IVerbsTrainedData[];
}): Promise<IBaseApiResponse> => {
  const result = await putRequest(HTTP_REQUEST_URL.VERBS_TRAININGS, {
    params: {
      language,
    },
    data: {
      verbsToUpdate,
    },
  });

  return result;
};

const makeSaveUserTrainingsRequest = async ({
  data,
}: {
  data: IUserTrainingData;
}): Promise<IBaseApiResponse> => {
  const result = await putRequest(HTTP_REQUEST_URL.USER_TRAININGS, {
    params: {},
    data,
  });

  return result;
};

const getCalculatedData = (results: IFinishRoundVerbResults[]): ICalculatedData => {
  const data: ICalculatedData = {
    marks: [],
    questions: 0,
    corrects: 0,
    points: 0,
    averageMark: 0,
  };

  results.forEach((item) => {
    data.marks.push(item.mark);
    data.questions += item.questions;
    data.corrects += item.corrects;
    data.points += item.points;
  });

  data.averageMark = getAverageMark(data.marks);

  return data;
};

const getVerbsToUpdate = (param: IFinishRoundVerbResults[]): IVerbsTrainedData[] => {
  return param.map((item) => ({
    _id: item.id,
    lastDateTrained: '', // calculated on the backend
    averageMark: null,
    marks: { [TRAININGS_TYPE.PRONOUN_TO_VERB]: item.mark },
  }));
};

const getUserTrainingToUpdate = ({
  language,
  userId,
  param,
}: IGetUserTrainingToUpdateParam): IUserTrainingData => {
  const points = param.reduce((accumulator, object) => {
    return accumulator + object.points;
  }, 0);

  return {
    language,
    userId,
    lastUpdated: new Date(), // calculated on the backend
    sumPoints: 0,
    trainings: [
      {
        date: '', // calculated on the backend
        points,
        type: TRAININGS_TYPE.PRONOUN_TO_VERB,
      },
    ],
  };
};

const Helpers = {
  getSelectedVerbsGroupsIdsToSave,
  makeSubmitRequest,
  getSelectedVerbsGroupsTitles,
  getUrlToSet,
  setUrlParams,
  getCalculatedData,
  makeSaveTrainingsRequest,
  makeSaveUserTrainingsRequest,
  getVerbsToUpdate,
  getUserTrainingToUpdate,
};

export default Helpers;
