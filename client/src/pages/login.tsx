import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_URL ?? "";
export const socket = io(URL, { transports: ["websocket"] });

const validateUsername = (username: string) => {
  // Check if the input contains only alphanumeric characters and does not exceed 10 characters
  return /^[A-Za-z0-9]{1,10}$/.test(username);
};

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  const handleLogin = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (validateUsername(username)) {
      if (username) {
        socket.emit("register", {
          username: username,
        });
        router.push({ pathname: "/home", query: { username: username } });
        socket.emit("get-all-users");
      }
    } else {
      // Show warning if the username does not meet the criteria
      setWarning(
        "Name must contain only alphabet and number, and not exceed 10 characters."
      );
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center bg-bgColor w-screen h-screen justify-center">
      <Image src="/logo.png" alt="" width={400} height={200}></Image>
      <form className="w-max mt-10 flex flex-row" onSubmit={handleLogin}>
        <input
          type="text"
          className="w-80 h-16 rounded-2xl bg-borderColor pl-5 text-white"
          placeholder="Enter your name"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className="w-18 flex items-center justify-center h-16 w-16 bg-purple rounded-full ml-5"
          name="Go"
        >
          <ArrowRightIcon className="h-8 w-8 text-white" strokeWidth={2} />
        </button>
      </form>
      {warning && <p className="mt-3 text-red-500">{warning}</p>}
    </div>
  );
};
export default Login;
