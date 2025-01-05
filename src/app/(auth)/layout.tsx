import Image from "next/image";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Image
        src={"/bg.jpg"}
        alt="background"
        fill
        className="absolute w-full h-full object-cover -z-50"
      />
      <div className="w-[400px] h-fit bg-white rounded-lg shadow-md p-6 ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
