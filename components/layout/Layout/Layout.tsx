import { FC, Fragment, ReactNode } from 'react';
import Image from 'next/image';

import MainNavigation from 'components/layout/MainNavigation';

import styles from './layout.module.scss';
import { IPropsLayout } from './model';

const Layout: FC<IPropsLayout> = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={styles.main}>{props.children}</main>
      <footer className={styles.footer}>
        <div>
          Footer
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </div>
      </footer>
    </Fragment>
  );
};

export default Layout;
