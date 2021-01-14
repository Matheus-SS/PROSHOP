import React, { useState, useCallback, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { RootStore } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressInformation } from '../../store/modules/shippingAddress/ShippingAddressAction';

import FormContainer from '../../components/FormContainer';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

const ShippingScreen = ({ history }: RouteComponentProps) => {
  const [address, setAddress] = useState<string | undefined>('');
  const [city, setCity] = useState<string | undefined>('');
  const [postalCode, setPostalCode] = useState<string | undefined>('');
  const [country, setCountry] = useState<string | undefined>('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state: RootStore) => {
    return state.userLogin;
  });
  const userLoginInfo = userLogin.userInfo; //user from redux

  const shippingAddressDetails = useSelector((state: RootStore) => {
    return state.shippingAddressInformation;
  });
  const {
    error,
    success,
    loading,
    shippingAddressInfo,
  } = shippingAddressDetails; // shipping address info from redux

  useEffect(() => {
    if (userLoginInfo) {
      dispatch(getAddressInformation());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userLoginInfo]);

  useEffect(() => {
    if (success) {
      setAddress(shippingAddressInfo?.address);
      setCity(shippingAddressInfo?.city);
      setCountry(shippingAddressInfo?.country);
      setPostalCode(shippingAddressInfo?.postalCode);
    }
  }, [shippingAddressInfo, success]);

  const submitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  }, []);

  return (
    <FormContainer>
      <h1> Shipping</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <Message variant="danger">{error}</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>city</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal Code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" disabled={!!error}>
              Continue
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              <Link to={'register_shipping'}>Register or update a address</Link>
            </Col>
          </Row>
        </>
      )}
    </FormContainer>
  );
};

export default ShippingScreen;
