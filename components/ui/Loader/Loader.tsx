import { FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import styles from './loader.module.scss';
import { IPropsLoader } from './model';

const Loader: FC<IPropsLoader> = () => {
  return (
    <div data-test="Loader" className={styles.container}>
      <Spinner animation="grow" />
    </div>
  );
};

export default Loader;
