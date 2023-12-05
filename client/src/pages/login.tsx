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
  const [tellText, setTellText] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const validateUsername = (username: string) => {
    return /^[A-Za-z0-9ก-๙]{1,13}$/.test(username);
  };
  const validatePassword = (password: string) => {
    return /^[A-Za-z0-9ก-๙@_]{6,13}$/.test(password);
  }

  const handleLogin = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (validateUsername(username)) {
      if (validatePassword(password)){
        const isUsernameTaken = await new Promise<boolean>((resolve) => {
          const usernameAvailabilityListener = (isAvailable: boolean) => {
            resolve(isAvailable);
          };
  
          socket.once("username-available", usernameAvailabilityListener);
          socket.emit("check-username", username, password);
        });
        if (isUsernameTaken) {
          socket.emit("register", {
            username: username,
            password: password,
            tell: tellText,
            emotion: selectedColor,
          });
          router.push({ pathname: "/home", query: { username: username } });
          socket.emit("get-all-users");
        } else {
          setWarning("หากมีบัญชีแล้ว กรุณาตรวจสอบ password ใหม่อีกครั้ง");
        }
      }else{
        setWarning(
          "Password  must contain only alphabet, number, Thai, @, _ and ไม่น้อยกว่า 6 not exceed 13 characters."
        );
      }
    } else {
      setWarning(
        "Name must contain only alphabet Thai and number, and not exceed 13 characters."
      );
    }
  };
  const colorVariants: {} = {
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    violet: "bg-violet-500",
    red: "bg-red-500",
  };
  const selectedColorVariants = {
    yellow: "bg-yellow-700",
    blue: "bg-blue-700",
    green: "bg-green-700",
    violet: "bg-violet-700",
    red: "bg-red-700",
  };
  const emotions = [
    { name: "Joy", color: "yellow" },
    { name: "Sadness", color: "blue" },
    { name: "Disgust", color: "green" },
    { name: "Fear", color: "violet" },
    { name: "Anger", color: "red" },
  ];
  const handleColorButtonClick = (color: string) => {
    setSelectedColor(color === selectedColor ? null : color);
  };
  const getColorButtonStyle = (color: string) => {
    const baseStyle =
      "w-10 h-10 rounded-full flex items-center justify-center mr-2 relative";
    const isSelected = color === selectedColor;

    return `${baseStyle} ${
      isSelected
        ? selectedColorVariants[color as keyof typeof selectedColorVariants]
        : colorVariants[color as keyof typeof colorVariants]
    }`;
  };

  const getColorButtonTextStyle = (color: string) => {
    return `text-white ${
      selectedColor === color ? "text-[10px]" : "invisible"
    } absolute center`;
  };
  return (
    <div className="flex flex-1 flex-col items-center bg-bgColor w-screen h-screen justify-center">
      <Image src="/logo.png" alt="" width={400} height={200}></Image>

      <form className="w-max mt-10 flex flex-col" onSubmit={handleLogin}>
        <div className="flex flex-row">
          <div className="flex flex-col items-center">
            <input
              type="text"
              className="w-80 h-16 rounded-2xl bg-borderColor pl-5 text-white"
              placeholder="Enter your name"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              className="w-80 h-16 rounded-2xl bg-borderColor pl-5 text-white mt-2 mb-10"
              placeholder="Enter your password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              className="w-full h-10 rounded-2xl bg-borderColor pl-5 text-white mt-2 text-sm "
              placeholder="Want to tell..."
              name="Tell"
              value={tellText}
              onChange={(e) => setTellText(e.target.value)}
            />
            <div className="flex mt-3">
              {emotions.map((emotion) => (
                <button
                  key={emotion.color}
                  type="button"
                  className={getColorButtonStyle(emotion.color)}
                  name={emotion.name}
                  onClick={() => handleColorButtonClick(emotion.color)}
                >
                  <span className={getColorButtonTextStyle(emotion.color)}>
                    {emotion.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
        {warning && <p className="mt-3 text-red-500">{warning}</p>}
        <div className="flex h-full items-center justify-center">
            <button
              type="submit"
              className="mt-10 h-16 flex items-center justify-center w-16 bg-purple rounded-full"
              name="Go"
            >
              <ArrowRightIcon className="h-8 w-8 text-white" strokeWidth={2} />
            </button>
          </div>
      </form>

    </div>
    
  );
};
export default Login;
