import { FC, FormEvent, useCallback, useState } from 'react';
// import dynamic from 'next/dynamic';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IVerbsDataDocument } from 'types';

import { SwitchesList } from 'components/forms';
import { PronounToVerb } from 'components/exercises';

// import styles from './startPronounToVerb.module.scss';
import { IPropsStartPronounToVerb } from './model';
import Helpers from './helpers';

// const PronounToVerb = dynamic(() => import('components/exercises/PronounToVerb'), { ssr: false });

const StartPronounToVerb: FC<IPropsStartPronounToVerb> = ({ verbsGroups }) => {
  const [verbs, setVerbs] = useState<IVerbsDataDocument[]>([]);
  const [selectedVerbsGroups, setSelectedVerbsGroups] = useState<string[]>([]);

  const saveSelectedVerbsGroupsHandler = useCallback(
    (id: string) => () => {
      if (!id) {
        return;
      }
      /* 
      const verbsGroupData = verbsGroups[0].groups.find((item) => item.id === id);

      if (!verbsGroupData) {
        return;
      } */

      setSelectedVerbsGroups((prevState) => Helpers.getSelectedVerbsGroupsIdsToSave(id, prevState));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      /* const { result }: IBaseApiResponse = await Helpers.makeSubmitRequest({
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
      } */
    },
    [selectedVerbsGroups]
  );

  return (
    <Row>
      <Col sm={12}>
        {verbsGroups?.[0]?.groups?.length && !verbs.length ? (
          <SwitchesList
            items={verbsGroups[0].groups.map((item) => {
              return {
                id: item.id,
                label: item.word,
                value: item.word,
              };
            })}
            onChangeItemHandler={saveSelectedVerbsGroupsHandler}
            handleSubmit={handleSubmit}
            isActiveSubmit={true}
            formTitle="Select verbs groups to train"
          />
        ) : (
          <PronounToVerb verbs={verbs} />
        )}
      </Col>
    </Row>
  );
};

export default StartPronounToVerb;
