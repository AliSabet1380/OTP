import Link from "next/link";

import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white    p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Application</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Experience the best features and seamless integration with our
        cutting-edge application. Join us today and explore the possibilities.
      </p>
      <Button asChild>
        <Link href={"/sign-in"} className="text-lg font-semibold">
          Sign in
        </Link>
      </Button>
    </div>
  );
};

export default Home;
