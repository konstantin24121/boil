import { Route, Redirect, StaticContext } from 'react-router';
import * as React from 'react';

interface IProps {
  from?: string;
  to: string;
  status: number;
}

export const RedirectWithStatus = ({ from, to, status }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.statusCode = status;
      }
      return <Redirect from={from} to={to} />;
    }}
  />
);
