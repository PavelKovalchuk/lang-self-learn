import { FC, FormEvent, useCallback, useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IFinishRoundVerbResults, IVerbsDataDocument } from 'types';
import {
  convertUrlArrayToArray,
  convertUrlSpecificArrayToArray,
  getLocationQueryStringParam,
} from 'utils';
import { APP_ROUTS, CUSTOM_VERBS_CATEGORIES_MAP, HTTP_REQUEST_URL, URL_PARAMS } from 'variables';
import { useToastState } from 'hooks';

import { SwitchesList } from 'components/forms';
import { PronounToVerb } from 'components/exercises';
import { Loader, ToastModal } from 'components/ui';
import { FinishExerciseModal } from 'components/modals';

// import styles from './startPronounToVerb.module.scss';
import { IPropsStartPronounToVerb } from './model';
import Helpers from './helpers';
import { CustomVerbsCategories, DefaultToastMessage } from './constants';
import useMemoData from './useMemoData';
import useRequests from './useRequests';

const StartPronounToVerb: FC<IPropsStartPronounToVerb> = ({ userId, language, verbsGroups }) => {
  const [verbs, setVerbs] = useState<IVerbsDataDocument[]>([]);
  const [selectedVerbsGroupsIds, setSelectedVerbsGroupsIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingVerbs, setIsLoadingVerbs] = useState<boolean>(false);
  const [isShowModalResult, setIsShowModalResult] = useState<boolean>(false);
  const [finishResults, setFinishResults] = useState<IFinishRoundVerbResults[]>([]);

  const { toastModalResult, setToastModalResult, onCloseToastModal } = useToastState({
    defaultMessage: DefaultToastMessage,
  });

  const { loadVerbsHandler, updateVerbsHandler, updateUserTrainingsHandler } = useRequests({
    language,
    userId,
    setVerbs,
    setToastModalResult,
  });

  const initFetcher = async () => {
    const queryUrlParam = getLocationQueryStringParam(URL_PARAMS.VERBS_GROUPS, 'string');
    const verbsGroupsParam = convertUrlArrayToArray(queryUrlParam);
    const customVerbsGroupsParam = convertUrlSpecificArrayToArray(
      queryUrlParam,
      CUSTOM_VERBS_CATEGORIES_MAP
    );

    if (!verbsGroupsParam?.length && !customVerbsGroupsParam?.length) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setSelectedVerbsGroupsIds([...verbsGroupsParam, ...customVerbsGroupsParam]);
    await loadVerbsHandler(verbsGroupsParam, customVerbsGroupsParam);
    setIsLoading(false);
  };

  const router = useRouter();
  useSWR(HTTP_REQUEST_URL.VERBS_BY_GROUPS, initFetcher, { revalidateOnFocus: false });
  const { isActiveSubmit, calculatedData, selectedVerbsGroupsTitles } = useMemoData({
    selectedVerbsGroupsIds,
    verbsGroups,
    finishResults,
  });

  useEffect(() => {
    Helpers.setUrlParams(selectedVerbsGroupsIds);
  }, [selectedVerbsGroupsIds]);

  const saveSelectedVerbsGroupsHandler = useCallback(
    (id: string) => () => {
      if (!id) {
        return;
      }

      setSelectedVerbsGroupsIds((prevState) =>
        Helpers.getSelectedVerbsGroupsIdsToSave(id, prevState)
      );
    },
    []
  );

  const onLoadVerbs = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsLoadingVerbs(true);
      const { items, customItems } = Helpers.filterVerbsGroupsIds(selectedVerbsGroupsIds);
      await loadVerbsHandler(items, customItems);
      setIsLoadingVerbs(false);
    },
    [selectedVerbsGroupsIds]
  );

  const onReturnHandlerCallback = useCallback(() => {
    setVerbs([]);
    setSelectedVerbsGroupsIds([]);
  }, []);

  const onCloseModalResult = useCallback(() => {
    setIsShowModalResult(false);
  }, []);

  const onFinishHandlerCallback = useCallback(async (param: IFinishRoundVerbResults[]) => {
    setFinishResults(param);
    setIsLoading(true);

    // 1.Save statistics to verb
    await updateVerbsHandler(Helpers.getVerbsToUpdate(param));
    // 2.Save statistics to user
    await updateUserTrainingsHandler(
      Helpers.getUserTrainingToUpdate({
        param,
        language,
        userId,
      })
    );

    // 3. Finish actions
    setIsLoading(false);
    onReturnHandlerCallback();
    router.push(APP_ROUTS.CONJUGATE);
    setIsShowModalResult(true);
  }, []);

  return (
    <>
      <Row data-test="StartPronounToVerb">
        <Col sm={12}>
          {isLoading ? <Loader /> : null}

          {!isLoading && verbsGroups?.[0]?.groups?.length && !verbs.length ? (
            <SwitchesList
              items={verbsGroups[0].groups.map((item) => {
                return {
                  id: item.id,
                  label: item.word,
                  value: item.word,
                };
              })}
              customItems={CustomVerbsCategories}
              onChangeItemHandler={saveSelectedVerbsGroupsHandler}
              handleSubmit={onLoadVerbs}
              isActiveSubmit={isActiveSubmit}
              formTitle="Select verbs groups to train"
              isLoading={isLoadingVerbs}
            />
          ) : null}

          {!isLoading && verbs.length ? (
            <PronounToVerb
              verbs={verbs}
              onReturnHandlerCallback={onReturnHandlerCallback}
              verbsGroupsTitles={selectedVerbsGroupsTitles}
              onFinishHandlerCallback={onFinishHandlerCallback}
            />
          ) : null}
        </Col>
      </Row>
      {calculatedData ? (
        <FinishExerciseModal
          results={finishResults.map((item) => ({ title: item.title, mark: item.mark }))}
          isShown={isShowModalResult}
          onClose={onCloseModalResult}
          questions={calculatedData.questions}
          corrects={calculatedData.corrects}
          averageMark={calculatedData.averageMark}
          points={calculatedData.points}
        />
      ) : null}

      <ToastModal
        type={toastModalResult.type}
        title={toastModalResult.title}
        message={toastModalResult.message}
        isShown={Boolean(toastModalResult.message)}
        onClose={onCloseToastModal}
      />
    </>
  );
};

export default StartPronounToVerb;
