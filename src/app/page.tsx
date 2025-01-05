import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Button asChild>
        <Link href={"/sign-in"}>Sign in</Link>
      </Button>
    </div>
  );
};

export default Home;
