import { useMemo } from 'react';

import Helpers from './helpers';
import { IUseMemoDataParam, IUseMemoDataResult } from './model';

const useMemoData = ({
  selectedVerbsGroupsIds,
  verbsGroups,
  finishResults,
}: IUseMemoDataParam): IUseMemoDataResult => {
  const isActiveSubmit = useMemo(() => {
    return Boolean(selectedVerbsGroupsIds.length);
  }, [selectedVerbsGroupsIds]);

  const isGroupsExists = useMemo(() => {
    return Boolean(verbsGroups?.[0]?.groups?.length);
  }, [verbsGroups]);

  const calculatedData = useMemo(() => {
    return finishResults.length ? Helpers.getCalculatedData(finishResults) : null;
  }, [finishResults]);

  const selectedVerbsGroupsTitles = useMemo(
    () => Helpers.getSelectedVerbsGroupsTitles(isGroupsExists, verbsGroups, selectedVerbsGroupsIds),
    [isGroupsExists, selectedVerbsGroupsIds]
  );

  return { isActiveSubmit, isGroupsExists, calculatedData, selectedVerbsGroupsTitles };
};

export default useMemoData;
