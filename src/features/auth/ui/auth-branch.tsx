import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

type Props = Readonly<{
  check: "anon" | "auth";
}>;

export const AuthBranch: React.FC<Props> = ({ check, children }) => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  if (isAuth === true && check === "auth") {
    return <>{children}</>;
  }
  if (isAuth === false && check === "anon") {
    return <>{children}</>;
  }

  return null;
};
