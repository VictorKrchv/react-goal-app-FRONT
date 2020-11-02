import React from "react";
import { Col, Row } from "antd";
import { GoalCard } from "~/features/goal";
import * as GoalSlice from "../GoalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";

export const GoalList = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(GoalSlice.getListData());
  }, []);

  const { list } = useSelector((state: RootState) => state.goal);
  console.log(list);
  return (
    <Row>
      {list.map((item, idx) => (
        <Col key={idx} style={{ marginBottom: "30px" }} span={6}>
          <GoalCard {...item} />
        </Col>
      ))}
    </Row>
  );
};
