import * as React from "react";
import { Card, Avatar } from "antd";
import { LikeFilled, EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { paths } from "~/pages/paths";

interface Props extends Goal {}

export const GoalCard: React.FC<Props> = ({
  title,
  description,
  id,
  goalCompletion,
}) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <LikeFilled key="Subscribe" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Card.Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title={<Link to={paths.goal(id)}>{title}</Link>}
        description={goalCompletion}
      />
    </Card>
  );
};
