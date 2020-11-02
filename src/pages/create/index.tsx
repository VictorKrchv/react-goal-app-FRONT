import React from "react";
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
  Button as AntdButton,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "~/ui";
import styled from "styled-components";
import { goalApi } from "~/api/goal";

export const CreatePage = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    goalApi
      .create({
        ...values,
        plans: values.plans.map((plan) => plan.first),
      })
      .then((res) => console.log(res));
  };

  return (
    <>
      <Title>Постановка цели</Title>
      <Row gutter={0}>
        <Col span={17}>
          <Card>
            <Form
              initialValues={{ plan: [""] }}
              onFinish={onFinish}
              form={form}
              layout="vertical"
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Поле не должно быть пустым",
                  },
                ]}
                name="title"
                label="Сформулируйте вашу цель"
              >
                <Input placeholder="Например, открыть кафе" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Поле не должно быть пустым",
                  },
                ]}
                name="goalCompletion"
                label="Критерий завершения цели"
              >
                <Input placeholder="Например кафе запущено и функционирует" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Поле не должно быть пустым",
                  },
                ]}
                name="description"
                label="Описание"
              >
                <Input.TextArea rows={5} placeholder="Описание" />
              </Form.Item>
              <Typography.Title level={4}>План действий</Typography.Title>
              <Form.List name="plans">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Space
                        key={field.key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "first"]}
                          fieldKey={[field.fieldKey, "first"]}
                          rules={[
                            {
                              required: true,
                              message: "Поле не должно быть пустым",
                            },
                          ]}
                        >
                          <Input prefix={<Number>{index + 1}</Number>} />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <AntdButton
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Добавить действие
                      </AntdButton>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <SideBar span={7}></SideBar>
      </Row>
    </>
  );
};

const Title = styled(Typography.Title)`
  font-weight: 700 !important;
  text-align: center;
  margin-top: 10px;
`;

const SideBar = styled(Col)`
  background: ${(props) => props.theme.primary};
`;
const Number = styled.span`
  color: ${(props) => props.theme.primary};
`;
