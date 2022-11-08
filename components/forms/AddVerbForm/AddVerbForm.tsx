import { FC, FormEvent, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// import styles from './addVerbForm.module.scss';
import { IPropsAddVerbForm } from './model';

const AddVerbForm: FC<IPropsAddVerbForm> = () => {
  // const [answers, setAnswers] = useState<IVerbAnswer[]>([]);

  // Add new component - for the pair

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    /*  const { result }: IBaseApiResponse = await postRequest(HTTP_REQUEST_URL.PRONOUN, {
        params: {
          language,
        },
        data: {
          userId,
          pronouns,
        },
      });

      if (result === 'ok') {
        setPronouns([]);
        setToastModalResult({ ...DefaultToastMessage, type: 'success', message: 'Congrats!' });
      } else {
        setToastModalResult({ ...DefaultToastMessage, type: 'danger', message: 'Error occurs.' });
      } */
  }, []);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row>
        <Col sm={12}>
          <h2>Add a verb data to your dictionary</h2>
        </Col>
      </Row>

      <Row className="mb-4 mt-3 ">
        <Col sm={12} md={4}>
          <Button variant="dark" type="button" className="w-100">
            Add a new pair
          </Button>
        </Col>
        <Col sm={12} md={4}>
          <Button variant="dark" type="submit" className="w-100">
            Submit
          </Button>
        </Col>
        <Col sm={12} md={4}>
          <Button variant="dark" type="button" className="w-100">
            Reset All
          </Button>
        </Col>
      </Row>

      <Row>
        <Col sm={5}>
          <Form.Control name="pronoun" type="text" placeholder="Pronoun" aria-label="pronoun" />
        </Col>
        <Col sm={5}>
          <Form.Control name="verb" type="text" placeholder="Verb" aria-label="verb" />
        </Col>
        <Col sm={2}>
          <Button variant="dark" type="button">
            Delete
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddVerbForm;
