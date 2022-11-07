import { NextPage } from 'next';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Layout from 'components/layout/Layout';
import { AddPronounForm, AddVerbForm } from 'components/forms';

interface IPropsAddVerbPage {}

const UserId = 1;
const Language = 'es';

const AddVerbPage: NextPage<IPropsAddVerbPage> = () => {
  return (
    <Layout>
      <Head>
        <title>Add Verb</title>
        <meta name="description" content="AddVerbPage" />
      </Head>

      <Container fluid>
        <Row>
          <Col sm={12} md={6} className="me-auto ms-auto mb-4">
            <hr className="bg-dark mb-4 mt-4" />
            <AddPronounForm userId={UserId} language={Language} />
            <hr className="bg-dark mb-4 mt-4" />
          </Col>
          <Col sm={12}>
            <AddVerbForm />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AddVerbPage;
