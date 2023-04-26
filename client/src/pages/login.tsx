import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_URL ?? "";
export const socket = io(URL, { transports: ["websocket"] });

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const handleLogin = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(username);
    console.log("login");
    if (username) {
      socket.emit("register", {
        username: username,
      });
      router.push({ pathname: "/home", query: { username: username } });
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center bg-bgColor w-screen h-screen justify-center">
      <Image src="/logo.png" alt="" width={400} height={200}></Image>
      <form className="w-1/4 mt-10 flex flex-row" onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            className="w-full h-16 rounded-2xl bg-borderColor pl-5 text-white"
            placeholder="Enter your name"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center h-16 w-16 bg-purple rounded-full ml-5"
          name="Go"
        >
          <ArrowRightIcon className="h-8 w-8 text-white" strokeWidth={2} />
        </button>
      </form>
    </div>
  );
};
export default Login;
