import React from "react";
import { Alert, Button, Card, Form, Input } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { paths } from "../paths";
import { Link } from "react-router-dom";
import { checkEmail } from "../../lib/validators";
import { loginUser, clearError } from "../../features/auth";
import { RootState } from "../../store";

interface Alert {
  type: "success" | "info" | "warning" | "error";
  message: string;
}

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { fingerPrint, isPending, errorMessage } = useSelector(
    (state: RootState) => state.auth,
  );
  const [form] = Form.useForm();

  const onFinish = (values: LoginValues) => {
    dispatch(loginUser({ ...values, fingerPrint }));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <LoginBox>
      <Card title="Вход" bordered={false}>
        {errorMessage && (
          <Alert closable showIcon type="error" message={errorMessage} />
        )}
        <Form
          form={form}
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Введите ваш email"
            name="email"
            rules={[
              { required: true, message: "Поле не должно быть пустым" },
              checkEmail,
            ]}
            validateTrigger="onSubmit"
          >
            <Input disabled={isPending} placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Введите ваш пароль"
            name="password"
            rules={[{ required: true, message: "Поле не должно быть пустым" }]}
          >
            <Input.Password disabled={isPending} placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button disabled={isPending} type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
        <Link to={paths.register()}>
          Нет аккаунта? Перейдите на страницу регистрации.
        </Link>
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
