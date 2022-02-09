import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { RootStore } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  createShippingAddress,
  getAddressInformation,
  updateShippingAddress,
} from '../../store/modules/shippingAddress/ShippingAddressAction';
import {
  REGISTER_SHIPPING_ADDRESS_REMOVE,
  UPDATE_SHIPPING_ADDRESS_REMOVE,
} from '../../store/modules/shippingAddress/types/ShippingAddressTypes';

import FormContainer from '../../components/FormContainer';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

const RegisterShippingScreen: React.FC = () => {
  const history = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState<string>('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state: RootStore) => {
    return state.userLogin;
  });
  const userLoginInfo = userLogin.userInfo; //user from localstorage

  const shippingAddressRegister = useSelector((state: RootStore) => {
    return state.registerShippingAddress;
  });

  const loadingRegister = shippingAddressRegister.loading;
  const successRegister = shippingAddressRegister.success;
  const shippingAddressInfoRegister =
    shippingAddressRegister.shippingAddressInfo; // shipping address info from redux

  const shippingAddressDetails = useSelector((state: RootStore) => {
    return state.shippingAddressInformation;
  });
  const { shippingAddressInfo, loading } = shippingAddressDetails; // shipping address info from redux

  const shippingAddressUpdate = useSelector((state: RootStore) => {
    return state.updatedShippingAddress;
  });

  const successUpdate = shippingAddressUpdate.success;

  //use effect to redirects to login if user is not logged in
  useEffect(() => {
    if (!userLoginInfo) {
      history('/login');
    }
  }, [history, userLoginInfo]);

  // use effect to fill the form fields
  useEffect(() => {
    if (shippingAddressInfo) {
      setAddress(shippingAddressInfo.address);
      setCity(shippingAddressInfo.city);
      setCountry(shippingAddressInfo.country);
      setPostalCode(shippingAddressInfo.postalCode);
    } else {
      dispatch(getAddressInformation());
    }
  }, [dispatch, shippingAddressInfo]);

  // use effect to clear a message when a register is done
  useEffect(() => {
    if (successRegister) {
      const timer = setTimeout(() => {
        dispatch({ type: REGISTER_SHIPPING_ADDRESS_REMOVE });
      }, 2000);

      return () => clearTimeout(timer);
    }

    if (successUpdate) {
      const timer = setTimeout(() => {
        dispatch({ type: UPDATE_SHIPPING_ADDRESS_REMOVE });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [shippingAddressInfoRegister, dispatch, successRegister, successUpdate]);

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (shippingAddressInfo || shippingAddressInfoRegister) {
        return dispatch(
          updateShippingAddress({ address, city, country, postalCode })
        );
      }
      return dispatch(
        createShippingAddress({ address, city, postalCode, country })
      );
    },
    [
      address,
      city,
      postalCode,
      country,
      dispatch,
      shippingAddressInfo,
      shippingAddressInfoRegister,
    ]
  );

  return (
    <FormContainer>
      <h1>shipping address profile</h1>
      {successRegister && (
        <Message variant="success">Address created successfully</Message>
      )}

      {successUpdate && (
        <Message variant="success">Address updated successfully</Message>
      )}
      {loading || loadingRegister ? (
        <Loader />
      ) : (
        <>
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

            <Button type="submit" variant="primary">
              {shippingAddressInfoRegister || shippingAddressInfo
                ? 'Update'
                : 'Register'}
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              <Link to={'/shipping'}>GO BACK</Link>
            </Col>
          </Row>
        </>
      )}
    </FormContainer>
  );
};

export default RegisterShippingScreen;
