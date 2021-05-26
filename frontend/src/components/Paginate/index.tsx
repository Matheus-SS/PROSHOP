import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

interface IPaginate {
  totalOfPages: number;
  currentPage: number;
}
const Paginate = ({ totalOfPages, currentPage }: IPaginate) => {
  const location = useLocation();
  const path = location.pathname;
  const baseURL =
    path.split('/page/')[0] === '/' ? '' : path.split('/page/')[0];

  return (
    <>
      {totalOfPages > 1 && (
        <Pagination className="justify-content-center my-3">
          {[...Array(totalOfPages).keys()].map((index) => (
            <LinkContainer key={index} to={`${baseURL}/page/${index + 1}`}>
              <Pagination.Item active={index + 1 === currentPage}>
                {index + 1}
              </Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )}
    </>
  );
};

export default Paginate;
