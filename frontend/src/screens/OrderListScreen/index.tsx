import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

import { RootStore } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../../store/modules/user/UserAction';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import axios from 'axios';
import { IOrder } from '../../store/modules/order/types/OrderType';

const OrderListScreen = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state: RootStore) => state.userLogin);
  const { userInfo } = userLogin;

  //send user to login if its not a admin
  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history.push('/login');
    }
  }, [history, userInfo]);

  // loading products
  useEffect(() => {
    axios
      .get('/api/orders')
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
        setError('');
      })
      .catch((err) => {
        setError(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
        setLoading(false);
      });
  }, []);

  console.log(orders);
  return (
    <>
      <h1> Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{String(order.createdAt).substring(0, 10)}</td>
                <td>{order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    String(order.paidAt).substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    String(order.deliveredAt).substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>

                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
