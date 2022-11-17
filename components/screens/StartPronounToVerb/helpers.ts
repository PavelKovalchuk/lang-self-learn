import { IBaseApiResponse, IFinishRoundVerbResults, IGroupsDataDocument } from 'types';
import {
  generateLocationQueryString,
  generateUrlParamsArray,
  getAverageMark,
  getRemovedParamFromLocationQueryString,
  getRequest,
  setUrl,
} from 'utils';
import { HTTP_REQUEST_URL, URL_PARAMS } from 'variables';
import { ICalculatedData } from './model';

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

const Helpers = {
  getSelectedVerbsGroupsIdsToSave,
  makeSubmitRequest,
  getSelectedVerbsGroupsTitles,
  getUrlToSet,
  setUrlParams,
  getCalculatedData,
};

export default Helpers;
