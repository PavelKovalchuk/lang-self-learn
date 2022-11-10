import { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IBaseApiResponse, IPronounDataDocument } from 'types';
import { HTTP_REQUEST_URL } from 'variables';
import { getRequest } from 'utils';

import Layout from 'components/layout/Layout';
import { AddVerbForm } from 'components/forms';

interface IPropsAddVerbsGroupsPage {
  pronounsGroups: IPronounDataDocument[];
}

const UserId = 1;
const Language = 'es';

const AddVerbsGroupsPage: NextPage<IPropsAddVerbsGroupsPage> = ({ pronounsGroups }) => {
  return (
    <Layout>
      <Head>
        <title>Add Verbs Groups</title>
        <meta name="description" content="Add Verbs Groups" />
      </Head>

      <Container fluid>
        <Row>
          <Col sm={12} md={8} className="me-auto ms-auto mb-4">
            <hr className="bg-dark mb-4 mt-4" />
            AddVerbsGroupsPage
            {/* <AddVerbForm pronounsGroups={pronounsGroups} /> */}
            <hr className="bg-dark mb-4 mt-4" />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

/* export async function getStaticProps(): Promise<GetStaticPropsResult<IPropsAddVerbPage>> {
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
      pronounsGroups: payload,
    },
  };
} */

export default AddVerbsGroupsPage;
