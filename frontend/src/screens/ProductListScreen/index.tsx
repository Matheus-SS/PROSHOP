import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { Button, Table, Row, Col } from 'react-bootstrap';

import { RootStore } from '../../store';
import { useSelector } from 'react-redux';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';

import axios from 'axios';

import { IProduct } from '../../store/modules/product/types/ProductTypes';

type IParams = {
  pageNumber: string;
}

const ProductListScreen :React.FC = () => {
  const { pageNumber = 1 } = useParams<IParams>();
  const history = useNavigate();

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantityPage, setQuantityPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [loadingCreateProduct, setLoadingCreateProduct] = useState(false);
  const [errorCreateProduct, setErrorLoadingCreateProduct] = useState('');

  const userLogin = useSelector((state: RootStore) => state.userLogin);
  const { userInfo } = userLogin;

  // loading products
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/products?pageNumber=${pageNumber}`, {
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
  }, [pageNumber]);

  //send user to login if its not a admin
  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history('/login');
    }
  }, [history, userInfo]);

  const deleteHandler = useCallback(
    async (id: string): Promise<void> => {
      if (window.confirm('Are you sure?')) {
        const newProducts = products.filter((product) => product._id !== id);

        setProducts(newProducts);
        axios.delete(`/api/products/${id}`);
      }
    },
    [products]
  );

  const createProductHandler = useCallback(async () => {
    setLoadingCreateProduct(true);
    try {
      const { data } = await axios.post('/api/products');
      setLoadingCreateProduct(false);
      history(`/admin/product/${data._id}/edit`);
    } catch (error) {
      setLoadingCreateProduct(false);
      setErrorLoadingCreateProduct('error when trying to create a new product');
    }
  }, [history]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            {loadingCreateProduct ? (
              'Carregando ...'
            ) : (
              <>
                <i className="fas fa-plus"></i> Create Product
              </>
            )}
          </Button>
          {errorCreateProduct && (
            <Message variant="danger">{errorCreateProduct}</Message>
          )}
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>

                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate totalOfPages={quantityPage} currentPage={currentPage} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
