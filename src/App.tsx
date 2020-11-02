import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global-styles";
import { Main } from "./pages/main";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "~/features/auth";
import { RootState } from "./store";
import { Spin } from "antd";
import "antd/dist/antd.css";
import { CenterContent } from "~/ui/templates/center-content";
import { hot } from "react-hot-loader";

const theme = {
  primary: "rgb(42, 184, 213)",
  secondary: "rgb(255, 204, 77)",
};

const App = () => {
  const dispatch = useDispatch();
  const { isReady } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    dispatch(getUserData());
  }, []);

  return isReady ? (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </>
  ) : (
    <CenterContent>
      <Spin tip="Loading..." />
    </CenterContent>
  );
};

declare const module: any;
export default hot(module)(App);
