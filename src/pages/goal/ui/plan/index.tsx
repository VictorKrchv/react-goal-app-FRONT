import * as React from "react";
import { Popconfirm, Typography } from "antd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "~/store";
import { setPlanIsComplete } from "~/features/goal";
import { CheckCircleOutlined } from "@ant-design/icons";

export const PlanList = () => {
  const currentGoal = useSelector((state: RootState) => state.goal.currentGoal);
  const { id: userId } = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const confirm = (id: number) => {
    dispatch(setPlanIsComplete(id));
  };

  return (
    <>
      {currentGoal?.plans?.map((plan, idx) => (
        <Typography.Paragraph key={idx}>
          <Number>{idx + 1}</Number>.{" "}
          {!plan.isComplete && userId === currentGoal.author.id ? (
            <Popconfirm
              title="Вы хотите отметить это задание как выполненое?"
              onConfirm={() => confirm(plan.id)}
              okText="Да"
              cancelText="Нет"
            >
              <PlanItem isCompleted={plan.isComplete}>
                {" "}
                {plan.name} {plan.isComplete && <CheckCircleOutlined />}
              </PlanItem>
            </Popconfirm>
          ) : (
            <PlanItem cantClick isCompleted={plan.isComplete}>
              {" "}
              {plan.name} {plan.isComplete && <CheckCircleOutlined />}
            </PlanItem>
          )}
        </Typography.Paragraph>
      ))}
    </>
  );
};

const Number = styled.span`
  color: ${(props) => props.theme.primary};
`;

const PlanItem = styled.span`
  cursor: ${(props) => (props.cantClick ? "default" : "pointer")};
  text-decoration: ${(props) => props.isCompleted && "line-through"};
  &:hover {
    text-decoration: ${(props) =>
      props.cantClick
        ? props.isCompleted
          ? "line-through"
          : "none"
        : "underline"};
  }
`;
