import { NextPage } from 'next';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Layout from 'components/layout/Layout';
import { AddVerbForm } from 'components/forms';

interface IPropsAddVerbPage {}

const AddVerbPage: NextPage<IPropsAddVerbPage> = () => {
  return (
    <Layout>
      <Head>
        <title>Add Verb</title>
        <meta name="description" content="AddVerbPage" />
      </Head>

      <Container fluid>
        <Row>
          <Col sm={12}>
            <AddVerbForm />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AddVerbPage;
