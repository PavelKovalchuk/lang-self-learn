import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Layout from 'components/layout/Layout';

interface IPropsSpanishHomePage {}

const SpanishHomePage: NextPage<IPropsSpanishHomePage> = () => {
  return (
    <Layout>
      <Head>
        <title>Spanish Home</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Container fluid>
        <Row>
          <Col sm={12}>
            <div>
              <h1>Spanish HomePage</h1>
              <p>Get started</p>
            </div>
          </Col>
          <Col sm={4}>
            <div>
              <Link href="/spanish/conjugate-regular-verbs">Conjugate Regular Verbs</Link>
            </div>
          </Col>
          <Col sm={4}>
            <div>
              <Link href="/spanish/add-verb">Add verb</Link>
            </div>
          </Col>
          <Col sm={4}>
            <div>
              <Link href="/spanish/add-pronouns">Add Pronouns</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default SpanishHomePage;
