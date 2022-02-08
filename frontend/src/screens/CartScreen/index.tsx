import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../../components/Message';
import { RootStore } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/modules/cart/CartAction';

const CartScreen = () => {
  const cart = useSelector((state: RootStore) => state.cart);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { cartItems } = cart;

  function arrayFromCountInStock(countInStock: number) {
    const array = Array.from(Array(countInStock), (x, index) => index + 1);
    return array;
  }

  const totalItemsInCart = useMemo(() => {
    const items = cartItems.reduce(
      (accumulator, cartItem) => accumulator + cartItem.quantity,
      0
    );
    return items;
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    const total = cartItems
      .reduce(
        (accumulator, cartItem) =>
          accumulator + cartItem.quantity * cartItem.price,
        0
      )
      .toFixed(2);

    return total;
  }, [cartItems]);

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history('/login?redirect=/shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((cartItem) => (
              <ListGroup.Item key={cartItem.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={cartItem.image}
                      alt={cartItem.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${cartItem.product}`}>
                      {cartItem.name}
                    </Link>
                  </Col>
                  <Col md={2}>${cartItem.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={cartItem.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(Number(e.target.value),cartItem.product)
                        )
                      }
                    >
                      {arrayFromCountInStock(cartItem.countInStock).map(
                        (value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(cartItem.product)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal items {totalItemsInCart}</h2>${totalPrice}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                PROCEED TO CHECKOUT
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
