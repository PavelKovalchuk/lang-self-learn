import { FC, FormEvent, useCallback, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { postRequest, sortArrayById } from 'utils';
import { IAddPronounData, IBaseApiResponse } from 'types';
import { HTTP_REQUEST_URL } from 'variables';
import { PronounData } from 'components/formsElements';
import { IBaseToastModalData, ToastModal } from 'components/ui';

// import styles from './addPronounForm.module.scss';
import { IPropsAddPronounForm } from './model';
import { DefaultPronoun, DefaultToastMessage } from './constants';

const AddPronounForm: FC<IPropsAddPronounForm> = ({ userId, language }) => {
  const [pronouns, setPronouns] = useState<IAddPronounData[]>([]);
  const [toastModalResult, setToastModalResult] = useState<IBaseToastModalData>(
    DefaultToastMessage
  );

  const onCloseToastModal = useCallback(() => {
    setToastModalResult({ ...DefaultToastMessage });
  }, []);

  const savePronounHandler = useCallback(
    (id: string, pronoun: string, translation: string) => () => {
      if (!id || !pronoun.trim() || !translation.trim()) {
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
        return [...prevPronouns, { pronoun, translation, id: String(prevPronouns.length + 1) }];
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

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const { result }: IBaseApiResponse = await postRequest(HTTP_REQUEST_URL.PRONOUN, {
        userId,
        language,
        pronouns,
      });

      if (result === 'ok') {
        setPronouns([]);
        setToastModalResult({ ...DefaultToastMessage, type: 'success', message: 'Congrats!' });
      } else {
        setToastModalResult({ ...DefaultToastMessage, type: 'danger', message: 'Error occurs.' });
      }
    },
    [pronouns]
  );

  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Col sm={12}>
            <h2>Add a pronoun data to your dictionary</h2>
          </Col>
        </Row>

        <Row className="mb-3 mt-3">
          <Col sm={4}>
            <Button variant="dark" type="button" onClick={addNewPairHandler}>
              Add a new pair
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

        <Button variant="dark" type="submit">
          Submit
        </Button>
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
