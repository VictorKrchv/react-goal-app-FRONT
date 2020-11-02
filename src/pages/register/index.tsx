import React from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Form, Input } from "antd";
import styled from "styled-components";
import { authApi } from "../../api/auth";
import { paths } from "../paths";
import { checkEmail, confirmPassword } from "../../lib/validators";

interface Alert {
  type: "success" | "info" | "warning" | "error";
  message: string;
}

export const RegisterPage = () => {
  const [form] = Form.useForm();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<Alert>({
    type: "info",
    message: "",
  });

  const onFinish = (values: RegisterValues) => {
    setIsPending(true);
    authApi
      .registerUser(values)
      .then((res) => {
        setAlert({ type: "success", message: res.message });
      })
      .catch(({ response }) => {
        setAlert({ type: "error", message: response.data.message });
      })
      .finally(() => {
        setIsPending(false);
        form.resetFields();
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LoginBox>
      <Card title="Регистрация" bordered={false}>
        {alert.message && <Alert {...alert} closable />}
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
            <Input placeholder="Email" disabled={isPending} />
          </Form.Item>

          <Form.Item
            label="Введите ваш пароль"
            name="password"
            rules={[{ required: true, message: "Поле не должно быть пустым" }]}
          >
            <Input.Password disabled={isPending} placeholder="Пароль" />
          </Form.Item>

          <Form.Item
            label="Повторите ваш пароль"
            name="repassword"
            rules={[
              {
                required: true,
                message: "Пожалуйста подтвердите ваш пароль",
              },
              confirmPassword,
            ]}
            validateTrigger="onSubmit"
          >
            <Input.Password
              disabled={isPending}
              placeholder="Повторите ваш пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button disabled={isPending} type="primary" htmlType="submit">
              Зарегистрировать
            </Button>
          </Form.Item>
        </Form>
        <Link to={paths.login()}>
          Есть аккаунт? Перейдите на страницу входа.
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
