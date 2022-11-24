import { FC } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { FormSubmit, FormTitle } from 'components/formsElements';

// import styles from './switchesList.module.scss';
import { IPropsSwitchesList } from './model';

const SwitchesList: FC<IPropsSwitchesList> = ({
  items,
  customItems,
  onChangeItemHandler,
  handleSubmit,
  isActiveSubmit,
  formTitle,
  isLoading,
}) => {
  return (
    <Row data-test="SwitchesList">
      <Col sm={12}>
        <Form noValidate onSubmit={handleSubmit}>
          <FormTitle title={formTitle} />

          <Row className="mb-3 mt-3">
            {items?.map((item) => {
              return (
                <Col key={item.id} sm={3}>
                  <Form.Check
                    type="switch"
                    id={item.id}
                    label={item.label}
                    value={item.value}
                    onChange={onChangeItemHandler(item.id)}
                  />
                </Col>
              );
            })}
          </Row>

          {customItems?.length ? (
            <Row className="mb-3 mt-3">
              {customItems?.map((item) => {
                return (
                  <Col key={item.id} sm={3}>
                    <Form.Check
                      type="switch"
                      id={item.id}
                      label={item.label}
                      value={item.value}
                      onChange={onChangeItemHandler(item.id)}
                    />
                  </Col>
                );
              })}
            </Row>
          ) : null}

          <FormSubmit
            title="Submit"
            isActiveSubmit={isActiveSubmit && !isLoading}
            withLoading
            isLoading={isLoading}
          />
        </Form>
      </Col>
    </Row>
  );
};

export default SwitchesList;
