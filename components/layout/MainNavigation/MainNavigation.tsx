import { FC } from 'react';
import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/client';

import Logo from 'components/layout/Logo';

import classes from './main-navigation.module.scss';
import { IPropsMainNavigation } from './model';

const MainNavigation: FC<IPropsMainNavigation> = (props) => {
  // const [session, loading] = useSession();

  return (
    <header className={classes.header}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/spanish">Spanish</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
