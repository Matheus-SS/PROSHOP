import React, { useEffect, useState } from 'react';

import { Col, Row } from 'react-bootstrap';

import Product from '../../components/Product';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';

import { IProduct } from '../../store/modules/product/types/ProductTypes';
import { useParams } from 'react-router';
import axios from 'axios';

interface IParams {
  keyword: string;
  pageNumber: string;
}
const HomeScreen = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { keyword = '', pageNumber = 1 } = useParams<IParams>();
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`, {
        cancelToken: source.token,
      })
      .then((response) => {
        setProducts(response.data.products);
        setCurrentPage(response.data.currentPage);
        setQuantityPage(response.data.quantityPages);
        setLoading(false);
        setError('');
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log(err.message);
        } else {
          setError(
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message
          );
          setLoading(false);
        }
      });

    return () => {
      source.cancel('axios request cancelled');
    };
  }, [keyword, pageNumber]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <Paginate totalOfPages={quantityPage} currentPage={currentPage} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
