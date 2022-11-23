import { FC } from 'react';
import Image from 'next/image';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MainNavigation from 'components/layout/MainNavigation';
import TrainingStatistics from 'components/layout/TrainingStatistics';

import styles from './layoutMain.tsx.module.scss';
import { IPropsLayout } from './model';

const Layout: FC<IPropsLayout> = ({ userTraining, children }) => {
  return (
    <>
      <MainNavigation />
      <main className={styles.main}>
        {userTraining ? (
          <Container fluid className="mb-4">
            <Row>
              <Col sm={12}>
                <TrainingStatistics userTraining={userTraining} />
              </Col>
            </Row>
          </Container>
        ) : null}

        {children}
      </main>
      <footer className={styles.footer}>
        <div>
          Footer
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </div>
      </footer>
    </>
  );
};

export default Layout;
