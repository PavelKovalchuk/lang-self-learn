import { FC, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ChoosePairCard } from 'components/cards';

import styles from './regularVerbs.module.scss';
import { IPropsRegularVerbs } from './model';

const RegularVerbs: FC<IPropsRegularVerbs> = (props) => {
  return (
    <Row>
      <Col sm={12}>
        {props.verbs.map((verb) => {
          return <ChoosePairCard key={verb.id} verbData={verb} />;
        })}
      </Col>
    </Row>
  );
};

export default RegularVerbs;
