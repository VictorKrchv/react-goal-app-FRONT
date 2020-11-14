import React from "react";
import { useParams } from "react-router-dom";
import { Col, Progress, Row, Spin, Typography } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getGoal } from "~/features/goal/GoalSlice";
import { RootState } from "~/store";
import { CheckCircleFilled } from "@ant-design/icons";
import { CenterContent } from "~/ui/templates/center-content";
import { PlanList } from "./ui";

interface ParamTypes {
  id: string;
}

export const GoalPage = () => {
  const { id } = useParams<ParamTypes>();
  const dispatch = useDispatch();

  const { currentGoal, isLoading } = useSelector(
    (state: RootState) => state.goal
  );

  const percent =
    currentGoal?.plans &&
    Math.round(
      (100 * currentGoal.plans.filter((plan) => plan.isComplete).length) /
        currentGoal.plans.length
    );

  React.useEffect(() => {
    dispatch(getGoal(id));
  }, [id]);

  return isLoading ? (
    <CenterContent>
      <Spin tip="Loading..." />
    </CenterContent>
  ) : (
    <RowBox>
      <Col span={18}>
        <Typography.Title level={1}>{currentGoal?.title}</Typography.Title>
        <Typography.Text>{currentGoal?.description}</Typography.Text>
        <Typography.Title level={5}>
          <CheckCircleFilled /> Критерий завершения
        </Typography.Title>
        <Typography.Text>{currentGoal?.goalCompletion}</Typography.Text>
        <Typography.Title level={5}>План действий</Typography.Title>
        <Progress percent={percent} />
        <PlanList />
      </Col>
      <Col span={6}>
        Автор: {currentGoal?.author.name || currentGoal?.author.email}
      </Col>
    </RowBox>
  );
};

const RowBox = styled(Row)`
  background: white;
  margin-top: 10px;
  padding: 30px;
  min-height: 90vh;
  box-shadow: 2px 3px 3px 3px rgba(0, 0, 0, 0.2);
`;
