import { FC } from 'react';

// import styles from './cardMark.module.scss';
import { IPropsCardMark } from './model';

const CardMark: FC<IPropsCardMark> = ({ mark, correctAnswer, allAnswer }) => {
  return (
    <>
      <h4>{`Your mark is: <i>${mark}</i>.`}</h4>
      <p>{`Correct ${correctAnswer} out of ${allAnswer}.`}</p>
    </>
  );
};

export default CardMark;
