import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

// import styles from './switchesList.module.scss';
import { IPropsSwitchesList } from './model';

const SwitchesList: FC<IPropsSwitchesList> = ({ items }) => {
  return (
    <Row>
      <Col sm={12}>
        <Form>
          {items?.map((item) => {
            return (
              <Form.Check
                key={item.id}
                type="switch"
                id={item.id}
                label={item.label}
                value={item.value}
              />
            );
          })}
        </Form>
      </Col>
    </Row>
  );
};

export default SwitchesList;
