import React, { useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const { cartItems } = cart;

  function arrayFromCountInStock(countInStock: number) {
    const array = Array.from(Array(countInStock), (x, index) => index + 1);
    return array;
  }

  const totalItemsInCart = useMemo(() => {
    const items = cartItems.reduce(
      (accumulator, cartItem) => accumulator + cartItem.product_quantity,
      0
    );
    return items;
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    const total = cartItems
      .reduce(
        (accumulator, cartItem) =>
          accumulator + cartItem.product_quantity * cartItem.product_price,
        0
      )
      .toFixed(2);

    return total;
  }, [cartItems]);

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
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
              <ListGroup.Item key={cartItem.product_id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={cartItem.product_image}
                      alt={cartItem.product_name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${cartItem.product_id}`}>
                      {cartItem.product_name}
                    </Link>
                  </Col>
                  <Col md={2}>${cartItem.product_price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={cartItem.product_quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(cartItem.product_id, Number(e.target.value))
                        )
                      }
                    >
                      {arrayFromCountInStock(cartItem.product_countInStock).map(
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
                      onClick={() => removeFromCartHandler(cartItem.product_id)}
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
