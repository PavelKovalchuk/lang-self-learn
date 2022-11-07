import { FC } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// import styles from './addVerbForm.module.scss';
import { IPropsAddVerbForm } from './model';

const AddVerbForm: FC<IPropsAddVerbForm> = () => {
  // const [answers, setAnswers] = useState<IVerbAnswer[]>([]);

  // Add new component - for the pair

  return (
    <Form>
      <Row>
        <Col sm={12}>
          <h2>Add a verb data to your dictionary</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={5}>
          <Form.Control name="pronoun" type="text" placeholder="Pronoun" aria-label="pronoun" />
          <Form.Text className="text-muted">Add a pronoun</Form.Text>
        </Col>
        <Col sm={5}>
          <Form.Control name="pronoun" type="text" placeholder="Verb" aria-label="verb" />
          <Form.Text className="text-muted">Add a verb</Form.Text>
        </Col>
        <Col sm={2}>
          <Button variant="dark" type="button">
            Add new pair
          </Button>
        </Col>
      </Row>
      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddVerbForm;
