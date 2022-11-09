import { FC, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { postRequest, sortArrayById } from 'utils';
import { IPronounData, IBaseApiResponse, IWordTranslationData } from 'types';
import { HTTP_REQUEST_URL } from 'variables';
import { PronounData, WordTranslationData } from 'components/formsElements';
import { IBaseToastModalData, ToastModal } from 'components/ui';

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

      setPronouns((prevPronouns) => {
        const pronounToEdit = prevPronouns.find((item) => {
          return item.id === id;
        });
        if (pronounToEdit) {
          return [
            ...prevPronouns.filter((item) => item.id !== id),
            { ...pronounToEdit, pronoun, translation },
          ];
        }
        return [
          ...prevPronouns,
          {
            pronoun: pronoun.trim(),
            translation: translation.trim(),
            id: String(prevPronouns.length + 1),
          },
        ];
      });
    },
    []
  );

  const deletePronounHandler = useCallback(
    (id: string) => () => {
      setPronouns((prevPronouns) => {
        return [
          ...prevPronouns
            .filter((item) => item.id !== id)
            .map((item, index) => ({ ...item, id: String(index + 1) })),
        ];
      });
    },
    []
  );

  const addNewPairHandler = useCallback(() => {
    setPronouns((prevPronouns) => {
      if (!prevPronouns.length) {
        return [
          { ...DefaultPronoun, id: '1' },
          { ...DefaultPronoun, id: '2' },
        ];
      }
      return [...prevPronouns, { ...DefaultPronoun, id: String(prevPronouns.length + 1) }];
    });
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

      const { result }: IBaseApiResponse = await postRequest(HTTP_REQUEST_URL.PRONOUN, {
        params: {
          language,
        },
        data: {
          userId,
          pronounGroup,
          pronouns,
        },
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
        <Row>
          <Col sm={12}>
            <h2>Add a pronoun data to your dictionary</h2>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={12}>
            <WordTranslationData
              id="pronouns-group"
              wordPlaceholder="Pronouns Group Name"
              wordAriaLabel="PronounsGroupName"
              saveWordHandler={savePronounGroupHandler}
              isToClear={isToClearAll}
            />
          </Col>
        </Row>

        <Row className="mb-4 mt-3 ">
          <Col sm={12} md={4}>
            <Button variant="dark" type="button" className="w-100" onClick={addNewPairHandler}>
              Add a new pair
            </Button>
          </Col>
          <Col sm={12} md={4}>
            <Button variant="dark" type="button" onClick={resetAllHandler} className="w-100">
              Reset All
            </Button>
          </Col>
          <Col sm={12} md={4}>
            <Button variant="dark" type="submit" className="w-100" disabled={!isActiveSubmit}>
              Submit
            </Button>
          </Col>
        </Row>

        {pronouns.length ? (
          sortArrayById(pronouns, 'id').map((item) => {
            return (
              <PronounData
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
          <PronounData
            id={DefaultPronoun.id}
            pronounSaved={DefaultPronoun.pronoun}
            translationSaved={DefaultPronoun.translation}
            savePronounHandler={savePronounHandler}
            deletePronounHandler={deletePronounHandler}
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

export default AddPronounForm;
