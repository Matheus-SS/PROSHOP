import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { RootStore } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDetails,
  updateUserProfile,
} from '../../store/modules/user/UserAction';
import { USER_UPDATE_PROFILE_REMOVE } from '../../store/modules/user/types/UserTypes';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

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

  useEffect(() => {
    if (!userLoginInfo) {
      history.push('/');
    }
  }, [history, userLoginInfo]);

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

      <Col md={9}></Col>
    </Row>
  );
};
export default ProfileScreen;
