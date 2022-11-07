import { FC, FormEvent, useCallback, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { sortArrayById } from 'utils';
import { IAddPronounData } from 'types';
import { PronounData } from 'components/formsElements';

// import styles from './addPronounForm.module.scss';
import { IPropsAddPronounForm } from './model';
import { DefaultPronoun } from './constants';

const AddPronounForm: FC<IPropsAddPronounForm> = ({ userId }) => {
  const [pronouns, setPronouns] = useState<IAddPronounData[]>([]);

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
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      console.log('handleSubmit: pronouns', pronouns, userId);
    },
    [pronouns]
  );

  return (
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
  );
};

export default AddPronounForm;
