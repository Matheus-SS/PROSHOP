import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

import { RootStore } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { cartSavePaymentMethod } from '../../store/modules/cart/CartAction';

import FormContainer from '../../components/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps';
import { useNavigate } from 'react-router';

const PaymentScreen :React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const history = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state: RootStore) => {
    return state.userLogin;
  });
  const userLoginInfo = userLogin.userInfo; //user from redux

  const shippingAddressDetails = useSelector((state: RootStore) => {
    return state.shippingAddressInformation;
  });
  const { shippingAddressInfo } = shippingAddressDetails; // shipping address info from redux

  useEffect(() => {
    if (!userLoginInfo) {
      history('/login');
    }
  }, [history, userLoginInfo]);

  useEffect(() => {
    if (!shippingAddressInfo) {
      history('/shipping');
    }
  }, [shippingAddressInfo, history]);

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(cartSavePaymentMethod(paymentMethod));
      history('/placeorder');
    },
    [dispatch, history, paymentMethod]
  );

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
