import { NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image';
import styles from 'pages/index.module.scss';

interface IPropsHomePage {}

const HomePage: NextPage<IPropsHomePage> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Homepage</h1>
        <p className={styles.description}>Get started</p>
      </main>

      <footer className={styles.footer}>
        <div>
          Footer
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
