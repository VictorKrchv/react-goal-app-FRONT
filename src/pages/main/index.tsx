import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AuthBranch, logoutUser } from "~/features/auth";
import { Link, useHistory, useLocation } from "react-router-dom";
import { HomeFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space } from "antd";
import { Container, Header } from "~/ui";
import { Routes } from "../routes";
import { paths } from "~/pages/paths";
import { RootState } from "~/store";

export const Main = () => {
  const location = useLocation().pathname;
  const history = useHistory();
  const dispatch = useDispatch();
  const { email, isReady } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push(paths.login());
  };

  const menu = (
    <Menu>
      <Menu.Item>Profile</Menu.Item>
      <Menu.Item onClick={handleLogout}> Logout</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Header>
        <Menu selectedKeys={[location]} mode="horizontal">
          <MenuItem key={paths.home()} icon={<HomeFilled />}>
            <Link to={paths.home()}>Home</Link>
          </MenuItem>
        </Menu>
        {isReady && (
          <RightHeader>
            <AuthBranch check="anon">
              <Link to={paths.login()}>
                <Button
                  type={location === paths.login() ? "primary" : "default"}
                >
                  Вход
                </Button>
              </Link>
              <Link to={paths.register()}>
                <Button
                  type={location === paths.register() ? "primary" : "default"}
                >
                  Регистрация
                </Button>
              </Link>
            </AuthBranch>
            <AuthBranch check="auth">
              <Space>
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                  <Button>{email}</Button>
                </Dropdown>
                <Link to={paths.create()}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                  />
                </Link>
              </Space>
            </AuthBranch>
          </RightHeader>
        )}
      </Header>
      <Container>
        <Routes />
      </Container>
    </>
  );
};

const RightHeader = styled.div`
  display: flex;
`;

const MenuItem = styled(Menu.Item)`
  padding: 5px 2px !important;
  font-size: 16px;
  text-transform: uppercase;
`;
