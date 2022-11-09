import { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IBaseApiResponse, IPronounData, IPronounDataDocument } from 'types';

import Layout from 'components/layout/Layout';
import { AddPronounForm, AddVerbForm } from 'components/forms';
import { HTTP_REQUEST_URL } from 'variables';
import { getRequest } from 'utils';

interface IPropsAddVerbPage {
  savedPronouns: IPronounDataDocument[];
}

const UserId = 1;
const Language = 'es';

const AddVerbPage: NextPage<IPropsAddVerbPage> = ({ savedPronouns }) => {
  return (
    <Layout>
      <Head>
        <title>Add Verb</title>
        <meta name="description" content="AddVerbPage" />
      </Head>

      <Container fluid>
        <Row>
          <Col sm={12} md={8} className="me-auto ms-auto mb-4">
            <hr className="bg-dark mb-4 mt-4" />
            <AddPronounForm userId={UserId} language={Language} />
            <hr className="bg-dark mb-4 mt-4" />
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={8} className="me-auto ms-auto mb-4">
            <hr className="bg-dark mb-4 mt-4" />
            // TODO: add dropdown for all groups of pronouns
            <AddVerbForm pronouns={savedPronouns[1].pronouns} />
            <hr className="bg-dark mb-4 mt-4" />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<IPropsAddVerbPage>> {
  const { result, message, payload }: IBaseApiResponse = await getRequest(
    HTTP_REQUEST_URL.PRONOUN,
    {
      language: Language,
      userId: String(UserId),
    }
  );

  console.log('--- getStaticProps: result', result, message, payload);

  return {
    props: {
      savedPronouns: payload,
    },
  };
}

export default AddVerbPage;
