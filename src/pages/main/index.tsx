import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AuthBranch, logoutUser } from "~/features/auth";
import { Link, useHistory, useLocation } from "react-router-dom";
import { HomeFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Select, Space } from "antd";
import { Container, Header } from "~/ui";
import { Routes } from "../routes";
import { paths } from "~/pages/paths";
import { RootState } from "~/store";
import { useTranslation } from "react-i18next";

export const Main = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { user, isReady } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push(paths.login());
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
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
        <Menu selectedKeys={[pathname]} mode="horizontal">
          <MenuItem key={paths.home()} icon={<HomeFilled />}>
            <Link to={paths.home()}>{t("header.home")}</Link>
          </MenuItem>
        </Menu>
        {isReady && (
          <RightHeader>
            <AuthBranch check="anon">
              <Link to={paths.login()}>
                <Button
                  type={pathname === paths.login() ? "primary" : "default"}
                >
                  {t("header.login")}
                </Button>
              </Link>
              <Link to={paths.register()}>
                <Button
                  type={pathname === paths.register() ? "primary" : "default"}
                >
                  {t("header.register")}
                </Button>
              </Link>
              <Select
                style={{ marginLeft: "10px" }}
                onSelect={changeLanguage}
                defaultValue={i18n.language}
              >
                <Select.Option value="ru">Русский</Select.Option>
                <Select.Option value="en">English</Select.Option>
              </Select>
            </AuthBranch>
            <AuthBranch check="auth">
              <Space>
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                  <Button>{user?.email || user?.name}</Button>
                </Dropdown>
                <Link to={paths.create()}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                  />
                </Link>
                <Select onSelect={changeLanguage} defaultValue={i18n.language}>
                  <Select.Option value="ru">Русский</Select.Option>
                  <Select.Option value="en">English</Select.Option>
                </Select>
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
