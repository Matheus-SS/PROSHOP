import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStore } from '../../store';
import { listProducts } from '../../store/modules/product/ProductAction';

import { Col, Row } from 'react-bootstrap';

import Product from '../../components/Product';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productListState = useSelector((state: RootStore) => {
    return state.productList;
  });

  const { error, loading, products } = productListState;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
