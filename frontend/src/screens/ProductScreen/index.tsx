import React, {
  useState,
  useMemo,
  useCallback,
  Fragment,
  FormEvent,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import axios from 'axios';

type UrlParams = { id: string };

const ProductScreen = ({ match }: RouteComponentProps<UrlParams>) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [product, setProduct] = useState<IProduct>({} as IProduct);

  const history = useHistory();

  const dispatch = useDispatch();

  const userLogin = useSelector((state: RootStore) => state.userLogin);
  const { userInfo } = userLogin;

  const {
    data: prod,
    loading,
    error: errorProduct,
  } = useFetch<IProduct>(`/api/products/${match.params.id}`);

  useEffect(() => {
    setProduct(prod);
  }, [prod]);
  // that function transforms a single number into a array of number
  // Ex.: number 5 into [1, 2, 3, 4, 5]
  const arrayFromCountInStock = useMemo(() => {
    const array = Array.from(
      Array(product.countInStock),
      (x, index) => index + 1
    );
    return array;
  }, [product.countInStock]);

  // add item to cart
  const addToCartHandler = useCallback(() => {
    dispatch(addToCart(match.params.id, quantity));
    history.push('/cart');
  }, [history, match.params.id, quantity, dispatch]);

  const reset = () => {
    setRating(0);
    setComment('');
  };
  const submitHandler = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          `/api/products/${match.params.id}/reviews`,
          {
            rating,
            comment,
          }
        );

        setProduct(response.data);
        reset();
      } catch (error) {
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    },
    [rating, comment, match.params.id]
  );

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : errorProduct ? (
        <Message variant="danger">{errorProduct}</Message>
      ) : (
        <Fragment>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating ? product.rating : 0}
                    text={`${product?.numReviews} reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

                <ListGroup.Item>
                  Description: ${product.description}
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
                        <strong>${product.price}</strong>
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
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
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
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Comments</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {error && (
                    <Message variant="danger" autoClose time={3000}>
                      {error}
                    </Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          required
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          required
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Fragment>
      )}
    </>
  );
};

export default ProductScreen;
