import { NextPage } from 'next';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IPronounDataDocument } from 'types';

import Layout from 'components/layout/Layout';
import { AddPronounForm } from 'components/forms';

interface IPropsAddPronounsPage {
  savedPronouns: IPronounDataDocument[];
}

const UserId = 1;
const Language = 'es';

const AddPronounsPage: NextPage<IPropsAddPronounsPage> = () => {
  return (
    <Layout>
      <Head>
        <title>Add Pronoun</title>
        <meta name="description" content="Add Pronouns Page" />
      </Head>

      <Container fluid>
        <Row>
          <Col sm={12} md={8} className="me-auto ms-auto mb-4">
            <hr className="bg-dark mb-4 mt-4" />
            <AddPronounForm userId={UserId} language={Language} />
            <hr className="bg-dark mb-4 mt-4" />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AddPronounsPage;
