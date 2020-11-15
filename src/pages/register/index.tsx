import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Alert, Button, Card, Form, Input } from "antd";
import styled from "styled-components";
import { authApi } from "~/api/auth";
import { paths } from "../paths";
import { checkEmail, confirmPassword } from "~/lib/validators";
import { errorMessage } from "~/lib/error-message";

export const RegisterPage = () => {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<Alert | null>(null);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  React.useEffect(() => {
    return () => {
      setAlert(null);
    };
  }, []);

  const onFinish = (values: RegisterValues) => {
    setIsPending(true);
    authApi
      .registerUser(values)
      .then((res) => {
        setAlert({ type: "success", message: res.message });
      })
      .catch((error) => {
        setAlert({
          type: "error",
          message: errorMessage(error),
        });
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
      <Card title={t("register.title")} bordered={false}>
        {alert?.message && <Alert {...alert} closable />}
        <Form
          form={form}
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label={t("register.emailLabel")}
            name="email"
            rules={[
              { required: true, message: "Поле не должно быть пустым" },
              checkEmail,
            ]}
            validateTrigger="onSubmit"
          >
            <Input
              placeholder={t("register.emailPlaceholder")}
              disabled={isPending}
            />
          </Form.Item>

          <Form.Item
            label={t("register.passwordLabel")}
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
              placeholder={t("register.passwordPlaceholder")}
            />
          </Form.Item>

          <Form.Item
            label={t("register.repasswordLabel")}
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
              placeholder={t("register.repasswordPlaceholder")}
            />
          </Form.Item>

          <Form.Item>
            <Button disabled={isPending} type="primary" htmlType="submit">
              {t("register.button")}
            </Button>
          </Form.Item>
        </Form>
        <Link to={paths.login()}>{t("register.helpText")}</Link>
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

interface Alert {
  type: "success" | "info" | "warning" | "error";
  message: string;
}
