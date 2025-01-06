"use client";

import { Button } from "@/components/ui/button";

import { useLogOut } from "@/features/auth/sign-up/api/use-log-out";

const Dashboard = () => {
  const { mutate, isPending } = useLogOut();

  const onClick = () => {
    mutate();
  };

  return (
    <div className="h-full bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      {/* Radial gradient for the container to give a spotlight effect */}
      <div className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="relative flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            Dashboard
          </h1>
          <Button
            onClick={onClick}
            disabled={isPending}
            className="relative border border-slate-800 bg-black text-white px-4 py-2 rounded-lg"
          >
            LogOut
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
