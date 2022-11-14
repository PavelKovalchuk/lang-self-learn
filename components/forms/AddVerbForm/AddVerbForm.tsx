import { FC, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { IBaseApiResponse, IIndefiniteVerbData, IVerbData } from 'types';
import { postRequest } from 'utils';
import { HTTP_REQUEST_URL } from 'variables';

import { IndefiniteVerbData, PronounVerbData } from 'components/formsElements';
import { ButtonsList, SimpleDropdown } from 'components/elements';
import { IBaseToastModalData, ToastModal } from 'components/ui';

// import styles from './addVerbForm.module.scss';
import { IPropsAddVerbForm } from './model';
import { DefaultIndefiniteData, DefaultToastMessage } from './constants';
import Helpers from './helpers';

const AddVerbForm: FC<IPropsAddVerbForm> = ({ pronounsGroups, verbsGroups, userId, language }) => {
  const [verbs, setVerbs] = useState<IVerbData[]>([]);
  const [selectedVerbsGroupsIds, setSelectedVerbsGroupsIds] = useState<string[]>([]);
  const [pronounsGroupId, setPronounsGroupId] = useState<string>('');
  const [isToClearAll, setIsToClearAll] = useState<boolean>(false);
  const [indefinite, setIndefinite] = useState<IIndefiniteVerbData>(DefaultIndefiniteData);
  const [toastModalResult, setToastModalResult] = useState<IBaseToastModalData>(
    DefaultToastMessage
  );

  const isActiveSubmit = useMemo(() => {
    return Helpers.checkActiveSubmit({
      verbs,
      selectedVerbsGroupsIds,
      pronounsGroupId,
      indefinite,
    });
  }, [verbs, selectedVerbsGroupsIds, pronounsGroupId, indefinite]);

  const currentPronouns = useMemo(() => {
    return pronounsGroups.find((item) => item._id === pronounsGroupId)?.pronouns || [];
  }, [pronounsGroupId]);

  useEffect(() => {
    // reset the flag after the reset all btn clicked
    if (!verbs.length) {
      setIsToClearAll(false);
    }
  }, [verbs.length]);

  const saveIndefiniteHandler = useCallback(
    (verb: string, translation: string) => () => {
      setIndefinite({
        verb: verb.trim(),
        translation: translation.trim(),
        id: verb.trim(),
      });
    },
    []
  );

  const onPronounsClickHandler = useCallback(
    (id: string) => () => {
      setPronounsGroupId(id);
    },
    []
  );

  const onVerbsGroupsClickHandler = useCallback(
    (id: string) => () => {
      setSelectedVerbsGroupsIds((prevState) =>
        Helpers.getSelectedVerbsGroupsIdsToSave(id, prevState)
      );
    },
    []
  );

  const saveVerbHandler = useCallback(
    (id: string, verb: string, verbTranslation: string) => () => {
      if (!id) {
        return;
      }

      const pronounData = currentPronouns.find((item) => item.id === id);

      if (!pronounData) {
        return;
      }

      setVerbs((prevVerbs) =>
        Helpers.getPronounsToSave({ id, verb, verbTranslation }, pronounData, prevVerbs)
      );
    },
    [currentPronouns]
  );

  const resetAllHandler = useCallback(() => {
    setVerbs([]);
    setIsToClearAll(true);
    setIndefinite(DefaultIndefiniteData);
    setPronounsGroupId('');
    setSelectedVerbsGroupsIds([]);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const { result }: IBaseApiResponse = await postRequest(HTTP_REQUEST_URL.VERBS, {
        params: {
          language,
        },
        data: {
          userId,
          indefinite,
          verbs,
          selectedVerbsGroupsIds,
          pronounsGroupId,
        },
      });

      if (result === 'ok') {
        resetAllHandler();
        setToastModalResult({ ...DefaultToastMessage, type: 'success', message: 'Congrats!' });
      } else {
        setToastModalResult({ ...DefaultToastMessage, type: 'danger', message: 'Error occurs.' });
      }
    },
    [verbs, indefinite, selectedVerbsGroupsIds, pronounsGroupId]
  );

  const onCloseToastModal = useCallback(() => {
    setToastModalResult({ ...DefaultToastMessage });
  }, []);

  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Col sm={12}>
            <h2>Add a verb data to your dictionary</h2>
          </Col>
        </Row>
        <Row className="mb-4 mt-3 ">
          <Col sm={12} md={6}>
            <Button variant="dark" type="button" className="w-100" onClick={resetAllHandler}>
              Reset All
            </Button>
          </Col>
          <Col sm={12} md={6}>
            {pronounsGroups?.length ? (
              <SimpleDropdown
                id="selectPronounsGroup"
                title="Select Pronouns Group"
                onDropdownClickHandler={onPronounsClickHandler}
                activeItemId={pronounsGroupId}
                items={pronounsGroups.map((item) => ({
                  id: item._id,
                  title: item.pronounGroup.word,
                }))}
              />
            ) : (
              <Link href="/spanish/add-pronouns">Create Pronouns Groups</Link>
            )}
          </Col>
        </Row>
        {verbsGroups?.[0].groups.length ? (
          <Row>
            <Col sm={12}>
              <ButtonsList
                ariaLabelGroup="Select categories"
                onClickHandler={onVerbsGroupsClickHandler}
                items={verbsGroups[0].groups.map((item) => {
                  return {
                    text: item.word,
                    id: item.id,
                  };
                })}
                selectedIds={selectedVerbsGroupsIds}
              />
            </Col>
          </Row>
        ) : (
          <Link href="/spanish/verbs-groups">Create Verbs Groups</Link>
        )}
        <IndefiniteVerbData
          saveIndefiniteHandler={saveIndefiniteHandler}
          isToClear={isToClearAll}
        />
        {currentPronouns?.length
          ? currentPronouns.map((pronoun) => {
              return (
                <PronounVerbData
                  key={pronoun.id}
                  id={pronoun.id}
                  pronoun={pronoun.pronoun}
                  pronounTranslation={pronoun.translation}
                  saveVerbHandler={saveVerbHandler}
                  isToClear={isToClearAll}
                />
              );
            })
          : null}

        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <Button variant="dark" type="submit" className="w-100" disabled={!isActiveSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
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

export default AddVerbForm;
