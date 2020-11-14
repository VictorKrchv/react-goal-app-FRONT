import { Button } from "antd";
import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch, useSelector } from "react-redux";
import { FacebookFilled } from "@ant-design/icons";

import { RootState } from "~/store";
import { loginUserFB } from "../AuthSlice";
import styled from "styled-components";

const appId = 771903630331711;

export const FacebookLoginButton = () => {
  const dispatch = useDispatch();
  const { fingerPrint } = useSelector((state: RootState) => state.auth);

  const responseFacebook = (response: FacebookResponse) => {
    dispatch(loginUserFB({ ...response, fingerPrint }));
  };

  return (
    <FacebookLogin
      appId={appId}
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      render={(renderProps) => (
        <FacebookButton onClick={renderProps.onClick}>
          <FacebookFilled /> Login from Facebook
        </FacebookButton>
      )}
    />
  );
};

const FacebookButton = styled.button`
  font-size: 16px;
  background-color: #3b5998;
  color: white;
  cursor: pointer;
  border: none;
  padding: 5px 8px;

  &:hover {
    background-color: #3b6edd;
    color: white;
    border: none;
  }
`;
