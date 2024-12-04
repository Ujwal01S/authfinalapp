"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrenUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user =  useCurrenUser();
  return (
    <div>
      <UserInfo label="Client Component" user={user} />
    </div>
  );
};

export default ClientPage;
