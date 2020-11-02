import React from "react";
import { Route, Redirect } from "react-router-dom";

interface Props {
  component: any;
  protect: boolean;
  path: string;
  exact: boolean;
}

export const PrivateRoute = ({
  component: Component,
  protect,
  ...rest
}: Props) => (
  <Route
    {...rest}
    render={(props) =>
      protect ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);
