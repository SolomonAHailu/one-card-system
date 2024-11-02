"use client";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const EachUsers = ({ params }: { params: { userId: string } }) => {
  const { users } = useSelector((state: RootState) => state.user);
  const currentUser = users.find((user) => user.ID === parseInt(params.userId));
  return <div>{currentUser?.first_name}</div>;
};

export default EachUsers;
