import { FC, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { putRequest, sortArrayById } from 'utils';
import { IBaseApiResponse, IGroupData } from 'types';
import { WordTranslationLabelData } from 'components/formsElements';
import { IBaseToastModalData, ToastModal } from 'components/ui';

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
    (word: string, translation: string, label: string, id: string) => () => {
      if (isToRestore) {
        setIsToRestore(false);
      }

      if (!isTouched) {
        setIsTouched(true);
      }

      setGroups((prevGroups) => {
        const groupToEdit = prevGroups.find((item) => {
          return item.id === id;
        });
        if (groupToEdit) {
          return [
            ...prevGroups.filter((item) => item.id !== id),
            { ...groupToEdit, word, translation, label },
          ];
        }
        return [
          ...prevGroups,
          {
            word: word.trim(),
            translation: translation.trim(),
            label: label.trim(),
            id: String(prevGroups.length + 1),
          },
        ];
      });
    },
    [isToRestore, isTouched]
  );

  const deleteGroupHandler = useCallback(
    (id: string) => () => {
      if (!isTouched) {
        setIsTouched(true);
      }

      setGroups((prevGroups) => {
        return [
          ...prevGroups
            .filter((item) => item.id !== id)
            .map((item, index) => ({ ...item, id: String(index + 1) })),
        ];
      });
    },
    [isTouched]
  );

  const addNewRowHandler = useCallback(() => {
    setGroups((prevGroups) => {
      if (!prevGroups.length) {
        return [
          { ...DefaultGroup, id: '1' },
          { ...DefaultGroup, id: '2' },
        ];
      }
      return [...prevGroups, { ...DefaultGroup, id: String(prevGroups.length + 1) }];
    });
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

      const { result, payload }: IBaseApiResponse = await putRequest(groupAPI, {
        params: {
          language,
        },
        data: {
          userId,
          groups,
        },
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
      <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Col sm={12}>
            <h2>Add a verbs groups data to your dictionary</h2>
          </Col>
        </Row>

        <Row className="mb-4 mt-3 ">
          <Col sm={12} md={4}>
            <Button variant="dark" type="button" className="w-100" onClick={addNewRowHandler}>
              Add a new row
            </Button>
          </Col>
          <Col sm={12} md={4}>
            <Button
              variant="dark"
              type="button"
              disabled={!isTouched}
              onClick={resetAllHandler}
              className="w-100"
            >
              {isSavedGroupsExists ? 'Restore All' : 'Reset All'}
            </Button>
          </Col>
          <Col sm={12} md={4}>
            <Button variant="dark" type="submit" className="w-100" disabled={!isActiveSubmit}>
              Submit
            </Button>
          </Col>
        </Row>

        {groups.length ? (
          sortArrayById(groups, 'id').map((item) => {
            return (
              <WordTranslationLabelData
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
          <WordTranslationLabelData
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
