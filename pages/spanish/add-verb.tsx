import { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IBaseApiResponse, IPronounData } from 'types';

import Layout from 'components/layout/Layout';
import { AddPronounForm, AddVerbForm } from 'components/forms';
import { HTTP_REQUEST_URL } from 'variables';
import { getRequest } from 'utils';

interface IPropsAddVerbPage {
  savedPronouns: IPronounData[];
}

const UserId = 1;
const Language = 'es';

const AddVerbPage: NextPage<IPropsAddVerbPage> = (props) => {
  console.log('AddVerbPage: savedPronouns', props.savedPronouns);

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
        </Row>
        <Row>
          <Col sm={12} md={6} className="me-auto ms-auto mb-4">
            <hr className="bg-dark mb-4 mt-4" />
            <AddVerbForm />
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
      savedPronouns: payload?.['pronouns'],
    },
  };
}

export default AddVerbPage;
