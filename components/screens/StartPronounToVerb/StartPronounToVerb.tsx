import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IVerbsDataDocument } from 'types';

import { SwitchesList } from 'components/ui';
import { PronounToVerb } from 'components/exercises';

// import styles from './startPronounToVerb.module.scss';
import { IPropsStartPronounToVerb } from './model';

// const PronounToVerb = dynamic(() => import('components/exercises/PronounToVerb'), { ssr: false });

const StartPronounToVerb: FC<IPropsStartPronounToVerb> = ({ verbsGroups }) => {
  const [verbs, setVerbs] = useState<IVerbsDataDocument[]>([]);

  return (
    <Row>
      <Col sm={12}>
        <h2>StartPronounToVerb</h2>
      </Col>

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
          />
        ) : (
          <PronounToVerb verbs={verbs} />
        )}
      </Col>
    </Row>
  );
};

export default StartPronounToVerb;
