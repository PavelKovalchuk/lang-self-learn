import { FC, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { IBaseApiResponse, IVerbData } from 'types';

import {
  FormActions,
  FormSubmit,
  FormTitle,
  IndefiniteVerb,
  PronounVerb,
} from 'components/formsElements';
import { ButtonsList, SimpleButton, SimpleDropdown } from 'components/elements';
import { IBaseToastModalData, ToastModal } from 'components/ui';
import { IIndefiniteVerbData } from 'components/formsElements/IndefiniteVerb';

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

      const { result }: IBaseApiResponse = await Helpers.makeSubmitRequest({
        language,
        userId,
        indefinite,
        verbs,
        selectedVerbsGroupsIds,
        pronounsGroupId,
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
        <FormTitle title="Add a verb data to your dictionary" />

        <FormActions>
          {[
            <SimpleButton key="reset-all" title="Reset All" onClick={resetAllHandler} />,
            pronounsGroups?.length ? (
              <SimpleDropdown
                key="selectPronounsGroup"
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
            ),
          ]}
        </FormActions>

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

        <IndefiniteVerb saveIndefiniteHandler={saveIndefiniteHandler} isToClear={isToClearAll} />

        {currentPronouns?.length
          ? currentPronouns.map((pronoun) => {
              return (
                <PronounVerb
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

export default AddVerbForm;
