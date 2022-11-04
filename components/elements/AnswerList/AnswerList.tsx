import { FC } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { EmojiSunglasses, EmojiFrown, XSquareFill } from 'react-bootstrap-icons';

// import styles from './answerList.module.scss';
import { IPropsAnswerList } from './model';

const AnswerList: FC<IPropsAnswerList> = ({
  answers,
  variants,
  isFinishedTest,
  onRemoveItemHandler,
}) => {
  return (
    <>
      <h4>Selected Pairs</h4>
      <ListGroup>
        {answers.map((item) => {
          const variantByPronoun = variants.find((variant) => {
            return variant.pronoun === item.pronoun;
          });

          return (
            <ListGroup.Item key={item.answerId}>
              <span className="ms-2 me-auto">{`${item.pronoun} ${item.verb}`}</span>

              {isFinishedTest && !item.isCorrect && variantByPronoun ? (
                <span className="ms-2 me-auto">
                  <Alert variant="info">
                    {`${variantByPronoun.pronoun} ${variantByPronoun.verb}`}
                  </Alert>
                </span>
              ) : null}

              {isFinishedTest ? (
                <Badge bg={item.isCorrect ? 'success' : 'danger'} pill>
                  {item.isCorrect ? <EmojiSunglasses size={24} /> : <EmojiFrown size={24} />}
                </Badge>
              ) : null}

              {!isFinishedTest ? (
                <Button variant="dark" onClick={onRemoveItemHandler(item.answerId)}>
                  <XSquareFill size={24} />
                </Button>
              ) : null}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};

export default AnswerList;
