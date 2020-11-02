import * as React from "react";
import styled from "styled-components";
import Search from "antd/es/input/Search";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { GoalList } from "~/features/goal";
import { goalApi } from "~/api/goal";

export const HomePage = () => {
  const menu = (
    <Menu>
      <Menu.Item key="popular">Популярные</Menu.Item>
      <Menu.Item key="new">Новые</Menu.Item>
    </Menu>
  );
  return (
    <div>
      <FilterRowBox>
        <InputBox>
          <Search placeholder="input search text" enterButton />
        </InputBox>
        <RightMenu>
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Filter <DownOutlined />
            </a>
          </Dropdown>
        </RightMenu>
      </FilterRowBox>
      <GoalList />
    </div>
  );
};

const FilterRowBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 13px;
  background: white;
  height: 60px;
  margin: 10px 0;
  width: 100%;
  -webkit-box-shadow: 5px 5px 3px -5px rgba(0, 0, 0, 0.38);
  box-shadow: 5px 5px 3px -5px rgba(0, 0, 0, 0.38);
`;

const RightMenu = styled.div``;

const InputBox = styled.div`
  width: 25%;
`;
