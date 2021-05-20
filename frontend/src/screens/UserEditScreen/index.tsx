import React, { useState, useEffect, useCallback } from 'react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { RootStore } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDetails,
  updateUser,
} from '../../store/modules/user/UserAction';
import { USER_UPDATE_REMOVE } from '../../store/modules/user/types/UserTypes';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

type UrlParams = { id: string };

const UserEditScreen = ({ match }: RouteComponentProps<UrlParams>) => {
  const userId = match.params.id;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state: RootStore) => {
    return state.userDetails;
  });
  const { loading, error, userInfo } = userDetails;

  const userUpdate = useSelector((state: RootStore) => {
    return state.userUpdate;
  });
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const history = useHistory();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_REMOVE });
      history.push('/admin/userList');
    }
  }, [successUpdate, history, dispatch]);

  useEffect(() => {
    if (!userInfo?.name || userInfo._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setIsAdmin(userInfo.isAdmin);
    }
  }, [userInfo, dispatch, userId]);

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    },
    [dispatch, name, email, isAdmin, userId]
  );

  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default UserEditScreen;
