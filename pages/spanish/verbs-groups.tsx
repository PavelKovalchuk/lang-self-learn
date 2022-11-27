import { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IGroupsDataDocument } from 'types';
import { HTTP_REQUEST_URL } from 'variables';

import { LayoutMain } from 'components/layout';
import { AddGroupForm } from 'components/forms';
import { getVerbsGroupsStaticProps } from 'utils/staticProps';

interface IPropsAddVerbsGroupsPage {
  verbsGroups: IGroupsDataDocument[];
}

const UserId = 1;
const Language = 'es';

const AddVerbsGroupsPage: NextPage<IPropsAddVerbsGroupsPage> = ({ verbsGroups }) => {
  return (
    <LayoutMain>
      <Head>
        <title>Add Verbs Groups</title>
        <meta name="description" content="Add Verbs Groups" />
      </Head>

      <Container fluid>
        <Row>
          <Col sm={12} md={8} className="me-auto ms-auto mb-4">
            <hr className="bg-dark mb-4 mt-4" />
            <AddGroupForm
              userId={UserId}
              language={Language}
              groupAPI={HTTP_REQUEST_URL.VERBS_GROUPS}
              groupsData={verbsGroups}
            />
            <hr className="bg-dark mb-4 mt-4" />
          </Col>
        </Row>
      </Container>
    </LayoutMain>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<IPropsAddVerbsGroupsPage>> {
  const verbsGroups = await getVerbsGroupsStaticProps(String(UserId), Language);

  return {
    props: {
      verbsGroups,
    },
  };
}

export default AddVerbsGroupsPage;
