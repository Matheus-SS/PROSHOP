import React, { useState, useEffect, useCallback } from 'react';
import {
  Link,
  RouteComponentProps,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { RootStore } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../store/modules/user/UserAction';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

type UrlParams = { id: string };

const UserEditScreen = ({ match }: RouteComponentProps<UrlParams>) => {
  const userId = match.params.id;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state: RootStore) => {
    return state.userDetails;
  });

  const { loading, error, userInfo } = userDetails;

  const history = useHistory();

  useEffect(() => {
    if (!userInfo?.name || userInfo._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setIsAdmin(userInfo.isAdmin);
    }
  }, [userInfo, dispatch, userId]);

  const submitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
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
