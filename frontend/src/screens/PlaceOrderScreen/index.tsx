import React, { useCallback, useEffect, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';

import { RootStore } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressInformation } from '../../store/modules/shippingAddress/ShippingAddressAction';
import { IShippingAddress } from '../../store/modules/shippingAddress/types/ShippingAddressTypes';
import { createOrder } from '../../store/modules/order/OrderAction';

import CheckoutSteps from '../../components/CheckoutSteps';
import Message from '../../components/Message';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAddressInformation());
  }, [dispatch]);

  const cart = useSelector((state: RootStore) => state.cart);

  const { shippingAddressInfo, loading } = useSelector(
    (state: RootStore) => state.shippingAddressInformation
  );

  let shipping: IShippingAddress;

  if (shippingAddressInfo) {
    shipping = {
      city: shippingAddressInfo.city,
      country: shippingAddressInfo.country,
      postalCode: shippingAddressInfo.postalCode,
      address: shippingAddressInfo.address,
    };
  }

  // Calculate price

  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const totalPriceEachItem = useMemo(() => {
    const sub = cart.cartItems.map((item) => item.price * item.quantity);
    return sub;
  }, [cart.cartItems]);

  const totalPriceAllItens = useMemo(() => {
    const total = addDecimals(
      cart.cartItems.reduce(
        (accumulator, cartItem) =>
          accumulator + cartItem.quantity * cartItem.price,
        0
      )
    );

    return total;
  }, [cart.cartItems]);

  const shippingPrice = useMemo(() => {
    return addDecimals(Number(totalPriceAllItens) > 100 ? 0 : 100);
  }, [totalPriceAllItens]);

  const taxPrice = (0.15 * Number(totalPriceAllItens)).toFixed(2);

  const carTotalPrice = (
    Number(totalPriceAllItens) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state: RootStore) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order?._id}`);
    }
  }, [history, success, order]);

  const placeOrderHandler = useCallback(() => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: shipping,
        paymentMethod: cart.paymentMethod,
        itemsPrice: Number(totalPriceAllItens),
        shippingPrice: Number(shippingPrice),
        taxPrice: Number(taxPrice),
        totalPrice: Number(carTotalPrice),
      })
    );
  }, [
    cart.cartItems,
    shippingAddressInfo,
    carTotalPrice,
    cart.paymentMethod,
    dispatch,
    shippingPrice,
    taxPrice,
    totalPriceAllItens,
  ]);
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {loading ? (
                  'Loading...'
                ) : (
                  <>
                    {shippingAddressInfo?.address},{shippingAddressInfo?.city}{' '}
                    {shippingAddressInfo?.postalCode},
                    {shippingAddressInfo?.country}
                  </>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
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
                          {item.quantity} x {item.price} = ${' '}
                          {totalPriceEachItem[index]}
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
                  <Col>$ {shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>$ {taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {carTotalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
