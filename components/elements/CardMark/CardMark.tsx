import { FC } from 'react';

// import styles from './cardMark.module.scss';
import { IPropsCardMark } from './model';

const CardMark: FC<IPropsCardMark> = ({ mark, correctAnswer, allAnswer }) => {
  return (
    <>
      <h4 data-test="CardMark">{`Your mark is: ${mark}.`}</h4>
      <p>{`Correct ${correctAnswer} out of ${allAnswer}.`}</p>
    </>
  );
};

export default CardMark;
