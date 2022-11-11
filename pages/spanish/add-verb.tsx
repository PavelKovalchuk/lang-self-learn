import { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IBaseApiResponse, IPronounDataDocument, IGroupsDataDocument } from 'types';
import { HTTP_REQUEST_URL } from 'variables';
import { getRequest } from 'utils';

import Layout from 'components/layout/Layout';
import { AddVerbForm } from 'components/forms';

interface IPropsAddVerbPage {
  pronounsGroups: IPronounDataDocument[];
  verbsGroups: IGroupsDataDocument[];
}

const UserId = 1;
const Language = 'es';

const AddVerbPage: NextPage<IPropsAddVerbPage> = ({ pronounsGroups, verbsGroups }) => {
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
            <AddVerbForm
              userId={UserId}
              language={Language}
              pronounsGroups={pronounsGroups}
              verbsGroups={verbsGroups}
            />
            <hr className="bg-dark mb-4 mt-4" />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<IPropsAddVerbPage>> {
  const {
    result: pronounsResult,
    message: pronounsMessage,
    payload: pronounsPayload,
  }: IBaseApiResponse = await getRequest(HTTP_REQUEST_URL.PRONOUN, {
    language: Language,
    userId: String(UserId),
  });

  const {
    result: verbsGroupsResult,
    message: verbsGroupsMessage,
    payload: verbsGroupsPayload,
  }: IBaseApiResponse = await getRequest(HTTP_REQUEST_URL.VERBS_GROUPS, {
    language: Language,
    userId: String(UserId),
  });

  console.log('--- getStaticProps: pronouns', pronounsResult, pronounsMessage, pronounsPayload);
  console.log(
    '--- getStaticProps: verbsGroups',
    verbsGroupsResult,
    verbsGroupsMessage,
    verbsGroupsPayload
  );

  return {
    props: {
      pronounsGroups: pronounsPayload,
      verbsGroups: verbsGroupsPayload,
    },
  };
}

export default AddVerbPage;
