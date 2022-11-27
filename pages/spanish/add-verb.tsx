import { GetStaticPropsResult, NextPage } from 'next';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IPronounDataDocument, IGroupsDataDocument } from 'types';

import { LayoutMain } from 'components/layout/';
import { AddVerbForm } from 'components/forms';
import { getPronounsGroupsStaticProps, getVerbsGroupsStaticProps } from 'utils/staticProps';

interface IPropsAddVerbPage {
  pronounsGroups: IPronounDataDocument[];
  verbsGroups: IGroupsDataDocument[];
}

const UserId = 1;
const Language = 'es';

const AddVerbPage: NextPage<IPropsAddVerbPage> = ({ pronounsGroups, verbsGroups }) => {
  return (
    <LayoutMain>
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
    </LayoutMain>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<IPropsAddVerbPage>> {
  const pronounsGroups = await getPronounsGroupsStaticProps(String(UserId), Language);
  const verbsGroups = await getVerbsGroupsStaticProps(String(UserId), Language);

  return {
    props: {
      pronounsGroups,
      verbsGroups,
    },
  };
}

export default AddVerbPage;
