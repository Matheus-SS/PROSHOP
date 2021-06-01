import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import Loader from '../Loader';
import Message from '../Message';
import { IProduct } from '../../store/modules/product/types/ProductTypes';
import { Carousel, Image } from 'react-bootstrap';

const ProductCarousel = () => {
  const {
    data: products,
    loading,
    error,
  } = useFetch<IProduct[]>('/api/products/top');
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} ({product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
