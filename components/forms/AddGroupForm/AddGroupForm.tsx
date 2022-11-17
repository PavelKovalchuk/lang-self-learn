import { FC, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Form from 'react-bootstrap/Form';

import { sortArrayById } from 'utils';
import { IBaseApiResponse, IGroupData } from 'types';
import { FormActions, FormSubmit, FormTitle, WordTranslationLabel } from 'components/formsElements';
import { IBaseToastModalData, ToastModal } from 'components/ui';
import { SimpleButton } from 'components/elements';

// import styles from './addPronounForm.module.scss';
import { IPropsAddGroupForm } from './model';
import { DefaultGroup, DefaultToastMessage } from './constants';
import Helpers from './helpers';

const AddGroupForm: FC<IPropsAddGroupForm> = ({ userId, language, groupAPI, groupsData }) => {
  const [isToClearAll, setIsToClearAll] = useState<boolean>(false);
  const [isToRestore, setIsToRestore] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [groups, setGroups] = useState<IGroupData[]>([]);
  const [toastModalResult, setToastModalResult] = useState<IBaseToastModalData>(
    DefaultToastMessage
  );

  const isSavedGroupsExists = useMemo(() => {
    return Boolean(groupsData?.[0]?.groups?.length);
  }, [groupsData]);

  useEffect(() => {
    // reset the flag after the reset all btn clicked
    if (!groups.length) {
      setIsToClearAll(false);
    }
  }, [groups.length]);

  useEffect(() => {
    if (isSavedGroupsExists) {
      setGroups(groupsData[0].groups);
    }
  }, []);

  const isActiveSubmit = useMemo(() => {
    return Helpers.checkActiveSubmit(groups);
  }, [groups]);

  const saveGroupHandler = useCallback(
    (params: { word: string; translation: string; label: string; id: string }) => () => {
      if (isToRestore) {
        setIsToRestore(false);
      }

      if (!isTouched) {
        setIsTouched(true);
      }

      setGroups((prevGroups) => Helpers.getGroupsToSave(params, prevGroups));
    },
    [isToRestore, isTouched]
  );

  const deleteGroupHandler = useCallback(
    (id: string) => () => {
      if (!isTouched) {
        setIsTouched(true);
      }

      setGroups((prevGroups) => Helpers.getGroupsToRemove(id, prevGroups));
    },
    [isTouched]
  );

  const addNewRowHandler = useCallback(() => {
    setGroups((prevGroups) => Helpers.getNewRowData(prevGroups));
  }, []);

  const resetAllHandler = useCallback(() => {
    setIsTouched(false);

    if (isSavedGroupsExists) {
      setGroups(groupsData[0].groups);
      setIsToRestore(true);

      return;
    }

    setGroups([]);
    setIsToClearAll(true);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const { result, payload }: IBaseApiResponse = await Helpers.makeSubmitRequest({
        language,
        userId,
        groupAPI,
        groups,
      });

      if (result === 'ok' && payload?.result?.groups) {
        setIsTouched(false);
        setGroups(payload.result.groups);
        setToastModalResult({ ...DefaultToastMessage, type: 'success', message: 'Congrats!' });
      } else {
        setToastModalResult({ ...DefaultToastMessage, type: 'danger', message: 'Error occurs.' });
      }
    },
    [groups]
  );

  const onCloseToastModal = useCallback(() => {
    setToastModalResult({ ...DefaultToastMessage });
  }, []);

  return (
    <>
      <Form data-test="AddGroupForm" noValidate onSubmit={handleSubmit}>
        <FormTitle title="Add a verbs groups data to your dictionary" />

        <FormActions>
          {[
            <SimpleButton key="new-row" title="Add a new row" onClick={addNewRowHandler} />,
            <SimpleButton
              key="reset"
              title={isSavedGroupsExists ? 'Restore All' : 'Reset All'}
              disabled={!isTouched}
              onClick={resetAllHandler}
            />,
          ]}
        </FormActions>

        {groups.length ? (
          sortArrayById(groups, 'id').map((item) => {
            return (
              <WordTranslationLabel
                key={`${item.id}-${item.word}`}
                id={item.id}
                wordPlaceholder="Verbs Group Name"
                wordAriaLabel="Verbs Group Name"
                saveItemHandler={saveGroupHandler}
                isToClear={isToClearAll}
                deleteItemHandler={deleteGroupHandler}
                wordSaved={item.word}
                labelSaved={item.label}
                translationSaved={item.translation}
                isToRestore={isToRestore}
              />
            );
          })
        ) : (
          <WordTranslationLabel
            id={DefaultGroup.id}
            wordPlaceholder="Verbs Group Name"
            wordAriaLabel="Verbs Group Name"
            saveItemHandler={saveGroupHandler}
            wordSaved={DefaultGroup.word}
            labelSaved={DefaultGroup.label}
            translationSaved={DefaultGroup.translation}
            isToClear={isToClearAll}
            isToRestore={isToRestore}
            deleteItemHandler={deleteGroupHandler}
          />
        )}
        <FormSubmit title="Submit" isActiveSubmit={isActiveSubmit} />
      </Form>

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

export default AddGroupForm;
