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
  const [warning, setWarning] = useState<string>("");
  const validateUsername = (username: string) => {
    return /^[A-Za-z0-9ก-๙]{1,13}$/.test(username);
  };
  const handleLogin = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (validateUsername(username)) {
      const isUsernameTaken = await new Promise<boolean>((resolve) => {
        const usernameAvailabilityListener = (isAvailable: boolean) => {
          resolve(isAvailable);
        };

        socket.once("username-available", usernameAvailabilityListener);
        socket.emit("check-username", username);
      });
      if (!isUsernameTaken) {
        socket.emit("register", {
          username: username,
        });
        router.push({ pathname: "/home", query: { username: username } });
        socket.emit("get-all-users");
      } else {
        setWarning("username ซ้ำ กรุณาตั้งชื่อใหม่");
      }
    } else {
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