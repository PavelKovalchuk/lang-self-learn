import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ChoosePairCard } from 'components/cards';
import { BaseCarousel } from 'components/ui';
import { SimpleButton } from 'components/elements';
import { FormActions } from 'components/formsElements';

import styles from './pronounToVerb.module.scss';
import { IPropsPronounToVerb } from './model';
import Helpers from './helpers';

const PronounToVerb: FC<IPropsPronounToVerb> = ({
  verbs,
  verbsGroupsTitles,
  onReturnHandlerCallback,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [marks, setMarks] = useState<number[]>([]);
  const [isToResetCards, setIsToResetCards] = useState<boolean>(false);
  const [isDisabledNext, setDisabledNext] = useState<boolean>(true);

  const averageMark = useMemo(() => {
    return Helpers.getCalculatedMark(marks);
  }, [marks]);

  useEffect(() => {
    if (isToResetCards) {
      setIsToResetCards(false);
    }
  }, [isToResetCards]);

  useEffect(() => {
    setDisabledNext(true);
  }, [activeIndex]);

  const onNextCarouselHandler = useCallback(
    (index: number) => () => {
      setActiveIndex(index);
    },
    []
  );

  const onFinishCardHandler = useCallback((mark: number) => {
    setMarks((prevMarks) => [...prevMarks, mark]);
    setDisabledNext(false);
  }, []);

  const onFinishRoundHandler = useCallback(() => {
    setActiveIndex(0);
    setMarks([]);
    setIsToResetCards(true);
  }, []);

  return (
    <Row className={styles.container}>
      <Col sm={12}>
        <p> TODO: add themes </p>
        <h2>
          Themes:
          {verbsGroupsTitles.map((item, index) => {
            return (
              <i key={item}>
                {index > 0 ? ', ' : ' '}
                {item}
              </i>
            );
          })}
        </h2>
        <p>{`Word ${activeIndex + 1}/${verbs.length}`}</p>
        {marks.length ? <p>{`Average mark: ${averageMark}`}</p> : null}
      </Col>

      <Col sm={12}>
        <div className={styles.navigationList}>
          {Array.from(Array(verbs.length).keys()).map((item) => {
            return (
              <span
                key={item}
                className={`${styles.navigationItem} ${
                  item === activeIndex ? 'bg-dark text-white' : 'bg-white'
                }`}
              >
                {item + 1}
              </span>
            );
          })}
        </div>
      </Col>

      <Col sm={12}>
        <FormActions>
          {[
            <SimpleButton key="return" title="Return" onClick={onReturnHandlerCallback} />,
            <SimpleButton
              key="restartRound"
              title="Restart Round"
              onClick={onFinishRoundHandler}
            />,
            activeIndex + 1 === verbs.length ? (
              <SimpleButton
                key="finish"
                title="Finish"
                disabled={isDisabledNext}
                onClick={onFinishRoundHandler}
              />
            ) : (
              <SimpleButton
                key="next"
                title="Next"
                onClick={onNextCarouselHandler(activeIndex + 1)}
                disabled={isDisabledNext}
              />
            ),
          ]}
        </FormActions>
      </Col>

      <Col sm={12}>
        <BaseCarousel
          className="pronoun-to-verb-carousel"
          activeIndex={activeIndex}
          items={verbs?.map((verb) => {
            return {
              component: (
                <div className="item-wrapper">
                  <ChoosePairCard
                    key={verb._id}
                    verbData={verb}
                    onFinishCardHandler={onFinishCardHandler}
                    isToReset={isToResetCards}
                  />
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
