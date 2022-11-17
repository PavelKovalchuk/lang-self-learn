import { FC } from 'react';
import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/client';

import { APP_ROUTS } from 'variables';

import Logo from 'components/layout/Logo';

import classes from './mainNavigation.module.scss';
import { IPropsMainNavigation } from './model';

const MainNavigation: FC<IPropsMainNavigation> = () => {
  // const [session, loading] = useSession();

  return (
    <header data-test="MainNavigation" className={classes.header}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href={APP_ROUTS.SPANISH}>Spanish</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
