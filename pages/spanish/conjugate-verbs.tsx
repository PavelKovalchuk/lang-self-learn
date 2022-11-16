import { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IBaseApiResponse, IGroupsDataDocument } from 'types';
import { getRequest } from 'utils';
import { HTTP_REQUEST_URL } from 'variables';

import { Layout } from 'components/layout';
import { StartPronounToVerb } from 'components/screens';

interface IPropsConjugateVerbsPage {
  verbsGroups: IGroupsDataDocument[];
}

const UserId = 1;
const Language = 'es';

const ConjugateVerbsPage: NextPage<IPropsConjugateVerbsPage> = ({ verbsGroups }) => {
  return (
    <Layout>
      <Head>
        <title>Conjugate Verbs</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Container fluid>
        <Row>
          <Col sm={12}>
            <Link href="/spanish/add-verb">Add verb if you do not have any</Link>
          </Col>

          <Col sm={12}>
            <StartPronounToVerb userId={UserId} language={Language} verbsGroups={verbsGroups} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<IPropsConjugateVerbsPage>> {
  const { payload: verbsGroupsPayload }: IBaseApiResponse = await getRequest(
    HTTP_REQUEST_URL.VERBS_GROUPS,
    {
      language: Language,
      userId: String(UserId),
    }
  );

  return {
    props: {
      verbsGroups: verbsGroupsPayload,
    },
  };
}

export default ConjugateVerbsPage;
