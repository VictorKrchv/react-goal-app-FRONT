import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./home";
import { LoginPage } from "./login";
import { RegisterPage } from "./register";
import { paths } from "./paths";
import { PrivateRoute } from "~/lib/private-route";
import { useSelector } from "react-redux";
import { RootState } from "~/store";
import { CreatePage } from "~/pages/create";
import { GoalPage } from "~/pages/goal";

export const Routes = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  return (
    <Switch>
      <Route path={paths.goal(":id")} component={GoalPage} />
      <Route path={paths.home()} component={HomePage} exact />
      <PrivateRoute
        path={paths.create()}
        component={CreatePage}
        exact
        protect={!isAuth}
      />
      <PrivateRoute
        path={paths.login()}
        component={LoginPage}
        exact
        protect={isAuth}
      />
      <PrivateRoute
        path={paths.register()}
        component={RegisterPage}
        exact
        protect={isAuth}
      />
    </Switch>
  );
};
