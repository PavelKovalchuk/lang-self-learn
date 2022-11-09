import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { IIndefiniteVerbData, IVerbData } from 'types';

import { IndefiniteVerbData, PronounVerbData } from 'components/formsElements';

// import styles from './addVerbForm.module.scss';
import { IPropsAddVerbForm } from './model';
import { DefaultIndefiniteData } from './constants';

const AddVerbForm: FC<IPropsAddVerbForm> = ({ pronouns }) => {
  const [verbs, setVerbs] = useState<IVerbData[]>([]);
  const [isToClearAll, setIsToClearAll] = useState<boolean>(false);
  const [indefinite, setIndefinite] = useState<IIndefiniteVerbData>(DefaultIndefiniteData);

  console.log('AddVerbForm: pronouns', pronouns);
  console.log('AddVerbForm: verbs', verbs);
  console.log('AddVerbForm: indefinite', indefinite);

  const saveIndefiniteHandler = useCallback(
    (verb: string, translation: string) => () => {
      if (!verb.trim() || !translation.trim()) {
        return;
      }

      setIndefinite({
        verb,
        translation,
        id: verb,
      });
    },
    []
  );

  const saveVerbHandler = useCallback(
    (id: string, verb: string, verbTranslation: string) => () => {
      if (!id || !verb.trim() || !verbTranslation.trim()) {
        return;
      }

      const pronounData = pronouns.find((item) => item.id === id);

      if (!pronounData) {
        return;
      }

      setVerbs((prevVerbs) => {
        const verbToEdit = prevVerbs.find((item) => {
          return item.id === id;
        });
        if (verbToEdit) {
          return [
            ...prevVerbs.filter((item) => item.id !== id),
            { ...verbToEdit, verb, verbTranslation },
          ];
        }
        return [
          ...prevVerbs,
          {
            pronoun: pronounData.pronoun,
            pronounTranslation: pronounData.translation,
            verb: verb.trim(),
            verbTranslation: verbTranslation.trim(),
            id: String(prevVerbs.length + 1),
          },
        ];
      });
    },
    []
  );

  const resetAllPairsHandler = useCallback(() => {
    setVerbs([]);
    setIsToClearAll(true);
    setIndefinite(DefaultIndefiniteData);
  }, []);

  useEffect(() => {
    // reset the flag after the reset all btn clicked
    if (!verbs.length) {
      setIsToClearAll(false);
    }
  }, [verbs.length]);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    /*  const { result }: IBaseApiResponse = await postRequest(HTTP_REQUEST_URL.PRONOUN, {
        params: {
          language,
        },
        data: {
          userId,
          pronouns,
        },
      });

      if (result === 'ok') {
        setPronouns([]);
        setToastModalResult({ ...DefaultToastMessage, type: 'success', message: 'Congrats!' });
      } else {
        setToastModalResult({ ...DefaultToastMessage, type: 'danger', message: 'Error occurs.' });
      } */
  }, []);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row>
        <Col sm={12}>
          <h2>Add a verb data to your dictionary</h2>
        </Col>
      </Row>
      // TODO: add a type of the verbs set
      <Row className="mb-4 mt-3 ">
        <Col sm={12} md={6}>
          <Button variant="dark" type="button" className="w-100" onClick={resetAllPairsHandler}>
            Reset All
          </Button>
        </Col>
        <Col sm={12} md={6}>
          <Button variant="dark" type="submit" className="w-100">
            Submit
          </Button>
        </Col>
      </Row>
      <IndefiniteVerbData saveIndefiniteHandler={saveIndefiniteHandler} isToClear={isToClearAll} />
      {pronouns.length
        ? pronouns.map((pronoun) => {
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
    </Form>
  );
};

export default AddVerbForm;
