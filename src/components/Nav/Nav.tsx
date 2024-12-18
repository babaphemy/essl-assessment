import React from "react";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="flex justify-between p-4 w-full">
      <div className="w-[200px]">
        <Button text="Schedule Service" onClick={() => router.push("/")} />
      </div>
      <div className="w-[200px]">
        <Button
          text="Service Requests"
          onClick={() => router.push("/service-requests")}
        />
      </div>
    </nav>
  );
};

export default Nav;
