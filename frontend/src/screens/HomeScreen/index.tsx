import React, { useEffect } from 'react';

import { Col, Row } from 'react-bootstrap';

import Product from '../../components/Product';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

import { useFetch } from '../../hooks/useFetch';

import { IProduct } from '../../store/modules/product/types/ProductTypes';

const HomeScreen = () => {
  const { data: products, loading, error } = useFetch<IProduct[]>(
    '/api/products'
  );

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products?.map((product) => (
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
