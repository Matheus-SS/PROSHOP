import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Form, Button, Row, Col, Image, ProgressBar } from 'react-bootstrap';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { useFetch } from '../../hooks/useFetch';
import { IProduct } from '../../store/modules/product/types/ProductTypes';
import axios from 'axios';
import { isImage } from '../../utils/fileChecker';

type UrlParams = { id: string };

const ProductEditScreen = ({ match }: RouteComponentProps<UrlParams>) => {
  const productId = match.params.id;

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [countInStock, setCountInStock] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const [updateLoading, setUpdateLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);

  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | string>('');
  const [previewSource, setPreviewSource] =
    useState<string | ArrayBuffer | null>('');
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const {
    data: product,
    error,
    loading,
  } = useFetch<IProduct>(`/api/products/${productId}`);

  const handleFileInputChange = (e: ChangeEvent) => {
    try {
      const target = e.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];

      if (isImage(file.name)) {
        setSelectedFile(file);
        previewFile(file);
        setFileInputState(target.value);
      }
    } catch (error) {
      setFileInputState('');
      console.log('Not a image');
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  // loading a preview image
  const previewFile = (file: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = () => {
    if (!selectedFile) return;
    uploadImage(selectedFile);
  };

  const uploadImage = async (file: File | string) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    const config = {
      onUploadProgress: (progressEvent: ProgressEvent) =>
        setProgress(
          Math.round((progressEvent.loaded / progressEvent.total) * 100)
        ),
    };

    try {
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data.url);
      setUploading(false);
      setFileInputState('');
      setPreviewSource('');
    } catch (error) {
      console.log('ERRO...', error);
      setUploading(false);
    }
  };
  const submitHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setUpdateLoading(true);
      setFailed(false);
      setSuccess(false);
      const product = {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
      };

      try {
        await axios.put(`/api/products/${productId}`, product);
        setUpdateLoading(false);

        setSuccess(true);
      } catch (error) {
        setUpdateLoading(false);
        setFailed(true);
      }
    },
    [name, price, description, image, brand, category, countInStock, productId]
  );

  return (
    <>
      <Link to="/admin/productList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                readOnly
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Row style={{ margin: '10px 0' }}>
                <Col sm={12} md={12} lg={12} xl={12}>
                  {image && <Image src={image} alt="chosen" width="100%" />}
                </Col>
              </Row>
              <br />
              <Form.File
                id="image-file"
                label="Choose File"
                value={fileInputState}
                custom
                onChange={handleFileInputChange}
              ></Form.File>
            </Form.Group>
            <Button
              onClick={handleSubmitFile}
              type="button"
              className="btn-block"
            >
              Upload Image
            </Button>

            <Row style={{ margin: '20px 0' }}>
              <Col sm={12} md={12} lg={12} xl={12}>
                {progress !== 100 && (
                  <ProgressBar animated now={progress} label={`${progress}%`} />
                )}
              </Col>
            </Row>

            {uploading && (
              <Row style={{ margin: '20px 0' }}>
                <Col sm={12} md={12} lg={12} xl={12}>
                  Uploading image to server . . .
                </Col>
              </Row>
            )}
            <Row style={{ margin: '20px 0' }}>
              <Col sm={12} md={12} lg={12} xl={12}>
                {previewSource && (
                  <Image
                    src={String(previewSource)}
                    alt="chosen"
                    width="100%"
                  />
                )}
              </Col>
            </Row>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>countInStock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {success && (
              <Message variant="success" autoClose={true}>
                Product updated
              </Message>
            )}

            {failed && (
              <Message variant="danger" autoClose={true}>
                Failed when trying to update the product
              </Message>
            )}

            {updateLoading ? (
              <Loader />
            ) : (
              <Button type="submit" variant="primary">
                Update
              </Button>
            )}
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default ProductEditScreen;
