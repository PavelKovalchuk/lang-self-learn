import { FC, FormEvent, useCallback, useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IBaseApiResponse, IFinishRoundVerbResults, IVerbsDataDocument } from 'types';
import { convertUrlArrayToArray, getLocationQueryStringParam } from 'utils';
import { APP_ROUTS, HTTP_REQUEST_URL, URL_PARAMS } from 'variables';

import { SwitchesList } from 'components/forms';
import { PronounToVerb } from 'components/exercises';
import { IBaseToastModalData, Loader, ToastModal } from 'components/ui';
import { FinishExerciseModal } from 'components/modals';

// import styles from './startPronounToVerb.module.scss';
import { IPropsStartPronounToVerb } from './model';
import Helpers from './helpers';
import { DefaultToastMessage } from './constants';

const StartPronounToVerb: FC<IPropsStartPronounToVerb> = ({ userId, language, verbsGroups }) => {
  const [verbs, setVerbs] = useState<IVerbsDataDocument[]>([]);
  const [selectedVerbsGroupsIds, setSelectedVerbsGroupsIds] = useState<string[]>([]);
  const [toastModalResult, setToastModalResult] = useState<IBaseToastModalData>(
    DefaultToastMessage
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShowModalResult, setIsShowModalResult] = useState<boolean>(false);
  const [finishResults, setFinishResults] = useState<IFinishRoundVerbResults[]>([]);

  const router = useRouter();

  const onSubmitHandler = useCallback(async (ids: string[]) => {
    const { result, payload }: IBaseApiResponse = await Helpers.makeSubmitRequest({
      language,
      userId: String(userId),
      selectedVerbsGroupsIds: ids,
    });

    if (result === 'ok') {
      setVerbs(payload);
      setToastModalResult({ ...DefaultToastMessage, type: 'success', message: 'Congrats!' });
    } else {
      setToastModalResult({ ...DefaultToastMessage, type: 'danger', message: 'Error occurs.' });
    }
  }, []);

  const fetcher = async () => {
    const queryUrlParam = getLocationQueryStringParam(URL_PARAMS.VERBS_GROUPS, 'string');
    const verbsGroupsParam = convertUrlArrayToArray(queryUrlParam);

    if (!verbsGroupsParam?.length) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setSelectedVerbsGroupsIds(verbsGroupsParam);
    await onSubmitHandler(verbsGroupsParam);
    setIsLoading(false);
  };

  useSWR(HTTP_REQUEST_URL.VERBS_BY_GROUPS, fetcher, { revalidateOnFocus: false });

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

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      await onSubmitHandler(selectedVerbsGroupsIds);
    },
    [selectedVerbsGroupsIds]
  );

  const onCloseToastModal = useCallback(() => {
    setToastModalResult({ ...DefaultToastMessage });
  }, []);

  const onReturnHandlerCallback = useCallback(() => {
    setVerbs([]);
    setSelectedVerbsGroupsIds([]);
  }, []);

  const onCloseModalResult = useCallback(() => {
    setIsShowModalResult(false);
    onReturnHandlerCallback();
    router.push(APP_ROUTS.CONJUGATE);
  }, []);

  const onFinishHandlerCallback = useCallback((param: IFinishRoundVerbResults[]) => {
    setFinishResults(param);
    setIsShowModalResult(true);
  }, []);

  return (
    <>
      <Row>
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
              onChangeItemHandler={saveSelectedVerbsGroupsHandler}
              handleSubmit={handleSubmit}
              isActiveSubmit={isActiveSubmit}
              formTitle="Select verbs groups to train"
            />
          ) : null}
          TODO: add finish logic // 1. save data in verbs (lastTrained, nextTrained, mark) // 2.
          screen with overall verbs results
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
      <ToastModal
        type={toastModalResult.type}
        title={toastModalResult.title}
        message={toastModalResult.message}
        isShown={Boolean(toastModalResult.message)}
        onClose={onCloseToastModal}
      />
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
    </>
  );
};

export default StartPronounToVerb;
