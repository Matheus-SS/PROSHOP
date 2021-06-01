import React from 'react';
import { Helmet } from 'react-helmet';

interface IMeta {
  title?: string;
  description?: string;
  keywords?: string;
}

const meta = {
  title: 'Welcome to Proshop',
  description: 'We sell the best products for cheap',
  keywords: 'eletronics, buy eletronics, cheap electronics',
};
const Meta = ({
  title = meta.title,
  description = meta.description,
  keywords = meta.keywords,
}: IMeta) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

export default Meta;
