import { FC, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { shuffleArray } from 'utils';

import styles from './regularVerbs.module.scss';
import { IPropsRegularVerbs } from './model';

interface IAnswer {
  [key: string]: INounData;
}

interface INounData {
  [pronoun: string]: {
    verb: string;
    expectedVerb: string;
    result: boolean;
  };
}

interface IVerbsShuffledData {
  verb: string;
  translation: string;
  pronounsShuffled: string[];
  verbsShuffled: string[];
}

const RegularVerbs: FC<IPropsRegularVerbs> = (props) => {
  const [answers, setAnswers] = useState<IAnswer | null>(null);
  const [verbsDataShuffled, setVerbsDataShuffled] = useState<IVerbsShuffledData[]>([]);

  useEffect(() => {
    console.log('--------- props.verbs', props.verbs);

    const dataShuffled: IVerbsShuffledData[] = props.verbs.map((item) => {
      const pronouns = item.variants.map((variant) => variant.pronoun);
      const verbs = item.variants.map((variant) => variant.verb);

      const pronounsShuffled = shuffleArray(pronouns);
      const verbsShuffled = shuffleArray(verbs);

      return {
        verb: item.verb,
        translation: item.translation,
        pronounsShuffled,
        verbsShuffled,
      };
    });

    setVerbsDataShuffled(dataShuffled);
  }, []);

  const onClickPronounHandler = useCallback(
    (answerKey: string, pronoun: string, expectedVerb: string) => () => {
      console.log('onClickHandler: pronoun', pronoun);

      // TODO: fix logic

      setAnswers((prevState) => {
        const newNounData: INounData = {
          [pronoun]: {
            verb: '',
            expectedVerb,
            result: true,
          },
        };

        if (!prevState) {
          return {
            [answerKey]: {
              ...newNounData,
            },
          };
        }

        return { ...prevState, [answerKey]: { ...prevState[answerKey], ...newNounData } };
      });
    },
    []
  );

  const onClickVerbHandler = useCallback(
    (answerKey: string, pronoun: string, verb: string) => () => {
      console.log('onClickHandler: verb', verb);

      setAnswers((prevState) => {
        const newNounData: INounData = {
          [pronoun]: {
            verb,
            expectedVerb: '',
            result: true,
          },
        };

        if (!prevState) {
          return {
            [answerKey]: {
              ...newNounData,
            },
          };
        }

        return { ...prevState, [answerKey]: { ...prevState[answerKey], ...newNounData } };
      });
    },
    []
  );

  console.log('answers', answers);

  return (
    <Row>
      <Col sm={12}>
        {verbsDataShuffled.map(({ verb, pronounsShuffled, verbsShuffled }) => {
          return (
            <div key={verb}>
              <ButtonGroup aria-label="pronouns" vertical>
                {pronounsShuffled.map((pronoun) => {
                  const expectedVerb = props.verbs
                    .filter((item) => item.verb === verb)[0]
                    .variants.filter((variant) => variant.pronoun === pronoun)[0].verb;
                  console.log('expectedVerb', expectedVerb);

                  return (
                    <Button
                      key={pronoun}
                      variant="secondary"
                      onClick={onClickPronounHandler(verb, pronoun, expectedVerb)}
                    >
                      {pronoun}
                    </Button>
                  );
                })}
              </ButtonGroup>

              <ButtonGroup aria-label="verbs" vertical>
                {verbsShuffled.map((currentVerb) => {
                  const expectedPronoun = props.verbs
                    .filter((item) => item.verb === verb)[0]
                    .variants.filter((variant) => variant.verb === currentVerb)[0].pronoun;
                  console.log('expectedPronoun', expectedPronoun);

                  return (
                    <Button
                      key={currentVerb}
                      variant="secondary"
                      onClick={onClickVerbHandler(verb, expectedPronoun, currentVerb)}
                    >
                      {currentVerb}
                    </Button>
                  );
                })}
              </ButtonGroup>
            </div>
          );
        })}
      </Col>
    </Row>
  );
};

export default RegularVerbs;
