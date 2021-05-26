import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import Header from '../Header';

interface IHeaderLayout extends RouteProps {
  component: React.ComponentType;
}
export const HeaderLayout: React.FunctionComponent<IHeaderLayout> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props: any) => (
      <>
        <Header />
        <Component {...props} />
      </>
    )}
  />
);
