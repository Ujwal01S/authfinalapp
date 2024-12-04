import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ label, user }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p>ID</p>
        <p className="truncate text-xs max-w-[180px] font-mono rounded-md bg-slate-100">
            {user?.id}
        </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p>Name</p>
        <p className="truncate text-xs max-w-[180px] font-mono rounded-md bg-slate-100">
            {user?.name}
        </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p>Email</p>
        <p className="truncate text-xs max-w-[180px] font-mono rounded-md bg-slate-100">
            {user?.email}
        </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p>Role</p>
        <p className="truncate text-xs max-w-[180px] font-mono rounded-md bg-slate-100">
            {user?.role}
        </p>
        </div>
      </CardContent>
    </Card>
  );
};
