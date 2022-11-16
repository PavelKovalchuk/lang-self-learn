import { FC, FormEvent, useCallback, useState, useMemo, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IBaseApiResponse, IVerbsDataDocument } from 'types';
import { convertUrlArrayToArray, getLocationQueryStringParam } from 'utils';

import { SwitchesList } from 'components/forms';
import { PronounToVerb } from 'components/exercises';
import { IBaseToastModalData, ToastModal } from 'components/ui';

// import styles from './startPronounToVerb.module.scss';
import { IPropsStartPronounToVerb } from './model';
import Helpers from './helpers';
import { DefaultToastMessage } from './constants';
import { URL_PARAMS } from 'variables';

const StartPronounToVerb: FC<IPropsStartPronounToVerb> = ({ userId, language, verbsGroups }) => {
  const [verbs, setVerbs] = useState<IVerbsDataDocument[]>([]);
  const [selectedVerbsGroupsIds, setSelectedVerbsGroupsIds] = useState<string[]>([]);
  const [toastModalResult, setToastModalResult] = useState<IBaseToastModalData>(
    DefaultToastMessage
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const queryUrlParam = getLocationQueryStringParam(URL_PARAMS.VERBS_GROUPS, 'string');

  const isActiveSubmit = useMemo(() => {
    return Boolean(selectedVerbsGroupsIds.length);
  }, [selectedVerbsGroupsIds]);

  const isGroupsExists = useMemo(() => {
    return Boolean(verbsGroups?.[0]?.groups?.length);
  }, [verbsGroups]);

  const selectedVerbsGroupsTitles = useMemo(
    () => Helpers.getSelectedVerbsGroupsTitles(isGroupsExists, verbsGroups, selectedVerbsGroupsIds),
    [isGroupsExists, selectedVerbsGroupsIds]
  );

  useEffect(() => {
    const verbsGroupsParam = convertUrlArrayToArray(queryUrlParam);

    console.log('**** useEffect: verbsGroupsParam', verbsGroupsParam);

    const fetchData = async () => {
      // set state with the result if `isSubscribed` is true
      setSelectedVerbsGroupsIds(verbsGroupsParam);
      await onSubmitHandler(verbsGroupsParam);
      setIsLoading(false);
    };

    if (verbsGroupsParam) {
      setIsLoading(true);
      fetchData().catch(console.error);
    }
  }, []);

  /* console.log('------------');
  console.log('selectedVerbsGroupsIds', selectedVerbsGroupsIds);
  console.log('verbs', verbs); */

  // TODO: revert it and test
  /* useEffect(() => {
    Helpers.setUrlParams(selectedVerbsGroupsIds);
  }, [selectedVerbsGroupsIds]); */

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

  const onSubmitHandler = useCallback(async (ids: string[]) => {
    console.log('-----REQUEST-------');

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

  return (
    <>
      <Row>
        <Col sm={12}>
          {isLoading ? (
            'LOADING'
          ) : verbsGroups?.[0]?.groups?.length && !verbs.length ? (
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
          ) : (
            <PronounToVerb
              verbs={verbs}
              onReturnHandlerCallback={onReturnHandlerCallback}
              verbsGroupsTitles={selectedVerbsGroupsTitles}
            />
          )}
        </Col>
      </Row>
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
