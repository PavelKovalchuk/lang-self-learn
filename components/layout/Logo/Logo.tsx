import { FC } from 'react';

import classes from './logo.module.scss';
import { IPropsLogo } from './model';

const Logo: FC<IPropsLogo> = (props) => {
  return <div className={classes.logo}>Logo</div>;
};

export default Logo;