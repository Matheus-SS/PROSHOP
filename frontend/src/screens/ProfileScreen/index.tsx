import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { format } from 'date-fns';
import { RootStore } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDetails,
  updateUserProfile,
} from '../../store/modules/user/UserAction';
import { USER_UPDATE_PROFILE_REMOVE } from '../../store/modules/user/types/UserTypes';
import { orderListMe } from '../../store/modules/order/OrderAction';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileScreen = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [successUpdate, setSuccessUpdate] = useState<string>('');
  const [errorUpdate, setErrorUpdate] = useState<string>('');

  const dispatch = useDispatch();

  const history = useHistory();

  const userDetails = useSelector((state: RootStore) => {
    return state.userDetails;
  });
  const { loading, userInfo } = userDetails; // user from redux

  const userLogin = useSelector((state: RootStore) => {
    return state.userLogin;
  });
  const userLoginInfo = userLogin.userInfo; //user from localstorage

  const userUpdateProfile = useSelector((state: RootStore) => {
    return state.userUpdateProfile;
  });

  const { success, error } = userUpdateProfile;

  const MeOrderList = useSelector((state: RootStore) => {
    return state.orderListMe;
  });

  const { loading: loadingOrders, error: errorOrders, order } = MeOrderList;

  useEffect(() => {
    if (!userLoginInfo) {
      history.push('/');
    }
  }, [history, userLoginInfo]);

  useEffect(() => {
    dispatch(orderListMe());
  }, [dispatch]);

  //useeffect that controls the info of the profile form
  useEffect(() => {
    if (!userInfo || success) {
      dispatch(getUserDetails('profile'));

      dispatch({ type: USER_UPDATE_PROFILE_REMOVE });
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [dispatch, userInfo, success]);

  // use effect to clear a message when a register is done
  useEffect(() => {
    if (success) {
      setSuccessUpdate('true');
    }
    if (successUpdate) {
      const timer = setTimeout(() => {
        setSuccessUpdate('');
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (error) {
      setErrorUpdate('true');
    }
    if (errorUpdate) {
      const timer = setTimeout(() => {
        dispatch({ type: USER_UPDATE_PROFILE_REMOVE });
        setErrorUpdate('');
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, success, successUpdate, error, errorUpdate, message]);

  function FormatDate(date: Date | undefined) {
    if (date) {
      return format(new Date(date), 'dd/MM/yyyy');
    }
  }

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setMessage('Password do not match');
      } else {
        dispatch(
          updateUserProfile({ id: userInfo?._id, name, email, password })
        );
      }
    },
    [email, password, name, confirmPassword, userInfo, dispatch]
  );

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {errorUpdate && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {successUpdate && <Message variant="success">Profile updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {order?.map((ord) => (
                <tr key={ord._id}>
                  <td>{ord._id}</td>
                  <td>{FormatDate(ord.createdAt)}</td>
                  <td>{ord.totalPrice}</td>
                  <td>
                    {ord.isPaid ? (
                      FormatDate(ord.paidAt)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {ord.isDelivered ? (
                      FormatDate(ord.deliveredAt)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${ord._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};
export default ProfileScreen;
