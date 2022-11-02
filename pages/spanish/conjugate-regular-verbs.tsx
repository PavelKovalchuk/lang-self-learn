import { NextPage } from 'next';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Layout from 'components/layout/Layout';
import { IRegularVerb } from 'types';
import dynamic from 'next/dynamic';

interface IPropsConjugateRegularVerbsPage {
  verbs: IRegularVerb[];
}

const RegularVerbs = dynamic(() => import('components/exercises/RegularVerbs'), { ssr: false });

const ConjugateRegularVerbsPage: NextPage<IPropsConjugateRegularVerbsPage> = (props) => {
  return (
    <Layout>
      <Head>
        <title>Conjugate Regular Verbs</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Container fluid>
        <Row>
          <Col sm={12}>
            <RegularVerbs verbs={props.verbs} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

const verbsMock = [
  {
    verb: 'hablar',
    translation: 'speak',
    variants: [
      {
        pronoun: 'Yo',
        verb: 'hablo',
      },
      {
        pronoun: 'Tú',
        verb: 'hablas',
      },
      {
        pronoun: 'Él',
        verb: 'habla',
      },
    ],
  },
];

export function getStaticProps() {
  return {
    props: {
      verbs: verbsMock,
    },
  };
}

export default ConjugateRegularVerbsPage;
