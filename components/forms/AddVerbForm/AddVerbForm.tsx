import { FC, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { IIndefiniteVerbData, IVerbData } from 'types';

import { IndefiniteVerbData, PronounVerbData } from 'components/formsElements';
import { ButtonsList, SimpleDropdown } from 'components/elements';

// import styles from './addVerbForm.module.scss';
import { IPropsAddVerbForm } from './model';
import { DefaultIndefiniteData } from './constants';

const AddVerbForm: FC<IPropsAddVerbForm> = ({ pronounsGroups, verbsGroups }) => {
  const [verbs, setVerbs] = useState<IVerbData[]>([]);
  const [selectedVerbsGroupsIds, setSelectedVerbsGroupsIds] = useState<string[]>([]);
  const [pronounsGroupId, setPronounsGroupId] = useState<string>('');
  const [isToClearAll, setIsToClearAll] = useState<boolean>(false);
  const [indefinite, setIndefinite] = useState<IIndefiniteVerbData>(DefaultIndefiniteData);

  console.log('AddVerbForm: verbsGroups', verbsGroups);

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
      setSelectedVerbsGroupsIds((prevState) => {
        const filteredItems = prevState.filter((item) => item !== id);
        if (filteredItems.length !== prevState.length) {
          return [...filteredItems];
        }
        return [...prevState, id];
      });
    },
    []
  );

  const saveVerbHandler = useCallback(
    (id: string, verb: string, verbTranslation: string) => () => {
      if (!id || !verb.trim() || !verbTranslation.trim()) {
        return;
      }

      const pronounData = currentPronouns.find((item) => item.id === id);

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
    setPronounsGroupId('');
  }, []);

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
      <Row className="mb-4 mt-3 ">
        <Col sm={12} md={4}>
          <Button variant="dark" type="button" className="w-100" onClick={resetAllPairsHandler}>
            Reset All
          </Button>
        </Col>
        <Col sm={12} md={4}>
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
        <Col sm={12} md={4}>
          <Button variant="dark" type="submit" className="w-100">
            Submit
          </Button>
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
      <IndefiniteVerbData saveIndefiniteHandler={saveIndefiniteHandler} isToClear={isToClearAll} />
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
    </Form>
  );
};

export default AddVerbForm;
