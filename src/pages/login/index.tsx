import React, { useEffect } from "react";
import { Alert, Button, Card, Form, Input, Space } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../paths";
import { Link } from "react-router-dom";
import { checkEmail } from "~/lib/validators";
import { loginUser, clearError } from "~/features/auth";
import { RootState } from "~/store";
import { useTranslation } from "react-i18next";
import { FacebookLoginButton } from "~/features/auth/ui";

interface Alert {
  type: "success" | "info" | "warning" | "error";
  message: string;
}

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { fingerPrint, isPending, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  const onFinish = (values: LoginValues) => {
    dispatch(loginUser({ ...values, fingerPrint }));
  };

  return (
    <LoginBox>
      <Card title={t("login.title")} bordered={false}>
        {errorMessage && (
          <Alert closable showIcon type="error" message={errorMessage} />
        )}
        <Form
          form={form}
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label={t("login.emailLabel")}
            name="email"
            rules={[
              { required: true, message: "Поле не должно быть пустым" },
              checkEmail,
            ]}
            validateTrigger="onSubmit"
          >
            <Input
              disabled={isPending}
              placeholder={t("login.emailPlaceholder")}
            />
          </Form.Item>

          <Form.Item
            label={t("login.passwordLabel")}
            name="password"
            rules={[
              { required: true, message: "Поле не должно быть пустым" },
              {
                min: 8,
                max: 32,
                message: "Пароль должен иметь от 8 до 32 символов",
              },
            ]}
          >
            <Input.Password
              disabled={isPending}
              placeholder={t("login.passwordPlaceholder")}
            />
          </Form.Item>
          <Form.Item>
            <Button disabled={isPending} type="primary" htmlType="submit">
              {t("login.button")}
            </Button>
          </Form.Item>
        </Form>
        <Space direction="vertical">
          <FacebookLoginButton />
          <Link to={paths.register()}>{t("login.helpText")}</Link>
        </Space>
      </Card>
    </LoginBox>
  );
};

const LoginBox = styled.div`
  display: flex;
  width: 50%;
  margin: 50px auto 0;
  flex-direction: column;

  & .ant-alert {
    margin-bottom: 20px;
  }
`;
