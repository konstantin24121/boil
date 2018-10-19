import * as React from 'react';
import { Route } from 'react-router';

interface IProps {
  status: number;
  children: React.ReactChild;
}

export const RouterStatus = ({ status, children }: IProps) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.statusCode = status;
      }
      return children;
    }}
  />
);
