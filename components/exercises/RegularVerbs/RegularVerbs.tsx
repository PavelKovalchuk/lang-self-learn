import { FC } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ChoosePairCard } from 'components/cards';

// import styles from './regularVerbs.module.scss';
import { IPropsRegularVerbs } from './model';

const RegularVerbs: FC<IPropsRegularVerbs> = ({ verbs }) => {
  return (
    <Row>
      <Col sm={12}>
        {verbs.map((verb) => {
          return <ChoosePairCard key={verb._id} verbData={verb} />;
        })}
      </Col>
    </Row>
  );
};

export default RegularVerbs;
