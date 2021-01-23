import React, { useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';

import { RootStore } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressInformation } from '../../store/modules/shippingAddress/ShippingAddressAction';

import CheckoutSteps from '../../components/CheckoutSteps';

import Message from '../../components/Message';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAddressInformation());
  }, [dispatch]);

  const cart = useSelector((state: RootStore) => state.cart);

  const { shippingAddressInfo, loading } = useSelector(
    (state: RootStore) => state.shippingAddressInformation
  );

  // Calculate price

  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const totalPriceEachItem = useMemo(() => {
    const sub = cart.cartItems.map(
      (item) => item.product_price * item.product_quantity
    );
    return sub;
  }, [cart.cartItems]);

  const totalPriceAllItens = useMemo(() => {
    const total = addDecimals(
      cart.cartItems.reduce(
        (accumulator, cartItem) =>
          accumulator + cartItem.product_quantity * cartItem.product_price,
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

  const placeOrderHandler = useCallback(() => {}, []);
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
                    <ListGroup.Item key={item.product_id}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.product_image}
                            alt={item.product_name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product_id}`}>
                            {item.product_name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.product_quantity} x {item.product_price} = ${' '}
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
