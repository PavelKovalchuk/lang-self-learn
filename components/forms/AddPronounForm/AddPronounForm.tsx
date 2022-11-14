import { FC, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { sortArrayById } from 'utils';
import { IPronounData, IBaseApiResponse } from 'types';
import {
  FormActions,
  FormSubmit,
  FormTitle,
  Pronoun,
  WordTranslation,
} from 'components/formsElements';
import { IBaseToastModalData, ToastModal } from 'components/ui';
import { SimpleButton } from 'components/elements';
import { IWordTranslationData } from 'components/formsElements/WordTranslation';

// import styles from './addPronounForm.module.scss';
import { IPropsAddPronounForm } from './model';
import { DefaultPronoun, DefaultPronounGroup, DefaultToastMessage } from './constants';
import Helpers from './helpers';

const AddPronounForm: FC<IPropsAddPronounForm> = ({ userId, language }) => {
  const [pronounGroup, setPronounGroup] = useState<IWordTranslationData>(DefaultPronounGroup);
  const [isToClearAll, setIsToClearAll] = useState<boolean>(false);
  const [pronouns, setPronouns] = useState<IPronounData[]>([]);
  const [toastModalResult, setToastModalResult] = useState<IBaseToastModalData>(
    DefaultToastMessage
  );

  useEffect(() => {
    // reset the flag after the reset all btn clicked
    if (!pronouns.length) {
      setIsToClearAll(false);
    }
  }, [pronouns.length]);

  const isActiveSubmit = useMemo(() => {
    return Helpers.checkActiveSubmit(pronouns, pronounGroup);
  }, [pronouns, pronounGroup]);

  const savePronounGroupHandler = useCallback(
    (word: string, translation: string) => () => {
      setPronounGroup({
        word: word.trim(),
        translation: translation.trim(),
        id: word.trim(),
      });
    },
    []
  );

  const onCloseToastModal = useCallback(() => {
    setToastModalResult({ ...DefaultToastMessage });
  }, []);

  const savePronounHandler = useCallback(
    (id: string, pronoun: string, translation: string) => () => {
      if (!id || !pronoun || !translation) {
        return;
      }

      setPronouns((prevPronouns) =>
        Helpers.getPronounsToSave({ id, pronoun, translation }, prevPronouns)
      );
    },
    []
  );

  const deletePronounHandler = useCallback(
    (id: string) => () => {
      setPronouns((prevPronouns) => Helpers.getPronounsToRemove(id, prevPronouns));
    },
    []
  );

  const addNewPairHandler = useCallback(() => {
    setPronouns((prevPronouns) => Helpers.getNewRowData(prevPronouns));
  }, []);

  const resetAllHandler = useCallback(() => {
    setPronouns([]);
    setPronounGroup({ ...DefaultPronounGroup });
    setIsToClearAll(true);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const { result }: IBaseApiResponse = await Helpers.makeSubmitRequest({
        language,
        userId,
        pronounGroup,
        pronouns,
      });

      if (result === 'ok') {
        resetAllHandler();
        setToastModalResult({ ...DefaultToastMessage, type: 'success', message: 'Congrats!' });
      } else {
        setToastModalResult({ ...DefaultToastMessage, type: 'danger', message: 'Error occurs.' });
      }
    },
    [pronouns, pronounGroup]
  );

  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <FormTitle title="Add a pronoun data to your dictionary" />

        <Row className="mb-3">
          <Col sm={12}>
            <WordTranslation
              id="pronouns-group"
              wordPlaceholder="Pronouns Group Name"
              wordAriaLabel="PronounsGroupName"
              saveWordHandler={savePronounGroupHandler}
              isToClear={isToClearAll}
            />
          </Col>
        </Row>

        <FormActions>
          {[
            <SimpleButton key="new-row" title="Add a new pair" onClick={addNewPairHandler} />,
            <SimpleButton key="reset-all" title="Reset All" onClick={resetAllHandler} />,
          ]}
        </FormActions>

        {pronouns.length ? (
          sortArrayById(pronouns, 'id').map((item) => {
            return (
              <Pronoun
                key={`${item.id}-${item.pronoun}`}
                id={item.id}
                pronounSaved={item.pronoun}
                translationSaved={item.translation}
                savePronounHandler={savePronounHandler}
                deletePronounHandler={deletePronounHandler}
              />
            );
          })
        ) : (
          <Pronoun
            id={DefaultPronoun.id}
            pronounSaved={DefaultPronoun.pronoun}
            translationSaved={DefaultPronoun.translation}
            savePronounHandler={savePronounHandler}
            deletePronounHandler={deletePronounHandler}
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

export default AddPronounForm;
