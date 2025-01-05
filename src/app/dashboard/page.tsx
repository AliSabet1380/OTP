"use client";

import { Button } from "@/components/ui/button";

import { useLogOut } from "@/features/auth/sign-up/api/use-log-out";

const Dashboard = () => {
  const { mutate, isPending } = useLogOut();

  const onClick = () => {
    mutate();
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Button onClick={onClick} disabled={isPending}>
        LogOut
      </Button>
    </div>
  );
};

export default Dashboard;
