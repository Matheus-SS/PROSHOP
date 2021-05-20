import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { PayPalButton } from 'react-paypal-button-v2';

import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';

import { RootStore } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrderDetails,
  payOrder,
} from '../../store/modules/order/OrderAction';
import { IPaymentResult } from '../../store/modules/order/types/OrderType';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import format from 'date-fns/format';

type UrlParams = { id: string };

const OrderScreen = ({ match, history }: RouteComponentProps<UrlParams>) => {
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState<boolean>(false);

  const [loadingDelivered, setLoadingDelivered] = useState(false);
  const [delivered, setDelivered] = useState(false);

  const orderDetails = useSelector((state: RootStore) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state: RootStore) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state: RootStore) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  let totalPriceAllItens;
  if (order) {
    totalPriceAllItens = addDecimals(
      order.orderItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    );
  }

  function FormatDate(date: Date | undefined) {
    if (date) {
      return format(new Date(date), 'dd/MM/yyyy');
    }
  }

  //CRIAR LOADING DE ORDERS
  useEffect(() => {
    setDelivered(false);
    if (!userInfo) {
      history.push('/login');
    }
    if (order?.isDelivered) {
      setDelivered(order.isDelivered);
    }
  }, [order, userInfo, history]);

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;

      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    dispatch(getOrderDetails(match.params.id));

    if (!order?.isPaid) {
      if ((window as any).paypal === undefined) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, match.params.id, successPay]);

  const successPaymentHandler = (paymentResult: IPaymentResult) => {
    //console.log(paymentResult);
    dispatch(payOrder(match.params.id, paymentResult));
  };

  const deliverHandler = async () => {
    setLoadingDelivered(true);
    try {
      await axios.put(`/api/orders/${order?._id}/deliver`);
      setDelivered(true);
      setLoadingDelivered(false);
    } catch (error) {
      console.log(error);
      setLoadingDelivered(false);
      setDelivered(false);
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <h1>ORDER: {order?._id} </h1>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order?.user?.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order?.user?.email}`}>
                  {order?.user?.email}
                </a>
              </p>

              <p>
                <strong>Address: </strong>
                <>
                  {order?.shippingAddress?.address},
                  {order?.shippingAddress?.city}{' '}
                  {order?.shippingAddress?.postalCode},
                  {order?.shippingAddress?.country}
                </>
              </p>
              {delivered ? (
                <Message variant="success">
                  Delivered on {FormatDate(order?.deliveredAt)}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">
                  Paid on {FormatDate(order?.paidAt)}
                </Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

              {order?.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems.map((item, index) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.quantity} x {item.price} = $
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items price:</Col>
                  <Col>$ {totalPriceAllItens}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {order?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>$ {order?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order?.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order?.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDelivered && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order?.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
