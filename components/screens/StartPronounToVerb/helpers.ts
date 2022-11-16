import { IBaseApiResponse, IGroupsDataDocument } from 'types';
import {
  generateLocationQueryString,
  generateUrlParamsArray,
  getRemovedParamFromLocationQueryString,
  getRequest,
  setUrl,
} from 'utils';
import { HTTP_REQUEST_URL, URL_PARAMS } from 'variables';

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
  /*  const chosenFilterIds = chosenFilterItems.map((item: IChosenFilterItem) =>
    encodeFilterIdParam({ sectionId: item.sectionId, itemId: String(item.itemId) })
  ); */

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

const Helpers = {
  getSelectedVerbsGroupsIdsToSave,
  makeSubmitRequest,
  getSelectedVerbsGroupsTitles,
  getUrlToSet,
  setUrlParams,
};

export default Helpers;
