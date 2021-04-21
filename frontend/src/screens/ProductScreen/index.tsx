import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../../store/modules/product/ProductAction';
import { RootStore } from '../../store';
import { addToCart } from '../../store/modules/cart/CartAction';

import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

import Rating from '../../components/Rating';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { IProduct } from '../../store/modules/product/types/ProductTypes';
import { useFetch } from '../../hooks/useFetch';

type UrlParams = { id: string };

const ProductScreen = ({ match }: RouteComponentProps<UrlParams>) => {
  const [quantity, setQuantity] = useState<number>(1);
  const history = useHistory();

  const dispatch = useDispatch();

  // fetching data using custom hook
  const { data: product, loading, error } = useFetch<IProduct>(
    `/api/products/${match.params.id}`
  );

  // that function transforms a single number into a array of number
  // Ex.: number 5 into [1, 2, 3, 4, 5]
  const arrayFromCountInStock = useMemo(() => {
    const array = Array.from(
      Array(product?.countInStock),
      (x, index) => index + 1
    );
    return array;
  }, [product?.countInStock]);

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match.params.id, dispatch]);

  // add item to cart
  const addToCartHandler = useCallback(() => {
    dispatch(addToCart(match.params.id, quantity));
    history.push('/cart');
  }, [history, match.params.id, quantity, dispatch]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={product?.rating ? product.rating : 0}
                  text={`${product?.numReviews} reviews`}
                />
              </ListGroup.Item>

              <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>

              <ListGroup.Item>
                Description: ${product?.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product && product.countInStock > 0
                        ? 'In Stock'
                        : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product && product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row className="align-items-center">
                      <Col xs={5} sm={5} md={8} lg={9}>
                        Quantity
                      </Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                        >
                          {arrayFromCountInStock.map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product?.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
