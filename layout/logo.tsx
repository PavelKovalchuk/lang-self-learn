import { FC } from 'react';
import classes from './logo.module.scss';

interface IPropsLogo {}

const Logo: FC<IPropsLogo> = (props) => {
  return <div className={classes.logo}>Logo</div>;
};

export default Logo;
