import { FC } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ChoosePairCard } from 'components/cards';
import { BaseCarousel } from 'components/ui';

// import styles from './regularVerbs.module.scss';
import { IPropsPronounToVerb } from './model';

const PronounToVerb: FC<IPropsPronounToVerb> = ({ verbs }) => {
  return (
    <Row>
      <Col sm={12}>
        <p> TODO: add overall data TODO: add next functionality</p>
        <h2>Themes: a, b</h2>
        <p>Word 1/10</p>
        <p>Average mark: 4</p>
      </Col>
      <Col sm={12}>
        <BaseCarousel
          className="pronoun-to-verb-carousel bg-dark"
          items={verbs.map((verb) => {
            return {
              component: (
                <div className="item-wrapper">
                  <ChoosePairCard key={verb._id} verbData={verb} />
                </div>
              ),
              id: verb._id,
            };
          })}
        />
      </Col>
    </Row>
  );
};

export default PronounToVerb;
