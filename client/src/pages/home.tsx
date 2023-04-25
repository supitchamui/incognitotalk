import { useState } from "react";
import io from "socket.io-client";
import Image from "next/image";
import Sidebar from "./Left-Sidebar/sidebar";

const URL = process.env.NEXT_PUBLIC_URL ?? "";
const socket = io(URL, { transports: ["websocket"] });

type Message = {
  author: string;
  message: string;
  time: Date;
  room: string;
};

const Home = () => {
  const [message, setmessage] = useState("");
  const [id, setId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState("");
  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    socket.emit("send-message", {
      author: id,
      message: message,
      time: new Date(),
      room: room,
    });
  };

  const handleJoinRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    socket.emit("join-room", { username: id, room: room });
  };

  socket.on("userId", (id) => {
    setId(id);
  });
  socket.on("message", (data) => {
    data.time = new Date(data.time);
    if (messages.length == 0) {
      setMessages([data]);
    } else {
      setMessages([...messages, data]);
    }
  });

  return (
    <>
      <div className="min-h-screen h-full flex-col flex">
        <div className="bg-darkBgColor w-full h-20 items-center flex border-b border-borderColor">
          <div className="flex items-center mr-0 justify-between flex-row w-full">
            <div className="flex-row flex">
              <div className="ml-5">
                <Image src="/logo1.png" alt="" width={40} height={40}></Image>
              </div>
              <p className="ml-5 text-2xl font-lexend-deca text-white">
                INCOGNITOTALK
              </p>
            </div>
            <div className="flex flex-row items-center hover:bg-bgColor p-2 rounded-2xl mr-3">
              <Image src="/Frame_8.png" alt="" width={50} height={50}></Image>
              <p className="ml-3 text-sm font-roboto text-white">Anonymous</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex-row flex">
          <Sidebar />
          <div className="bg-bgColor w-2/3">
            <div className="w-full h-full justify-center items-center flex-col flex">
              <Image
                src="/logo1.png"
                alt=""
                width={200}
                height={200}
                className="opacity-50"
              ></Image>
              <p className="text-xl font-roboto text-white opacity-40 mt-2">
                Start your new chat!
              </p>
            </div>
            {/*<div className="h-28 w-full border-b border-borderColor flex items-center">*/}
            {/*    <div className="flex items-center mr-10 w-full justify-between">*/}
            {/*        <div><p className="ml-10 text-3xl font-roboto text-white font-medium">Someone</p></div>*/}
            {/*        <div className="w-2/6">*/}
            {/*            <input type="text" className="w-full h-12 rounded-2xl bg-borderColor pl-5 text-white" placeholder="Search in this chat" name="search_user"/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div></div>*/}
            {/*    <div></div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </>
    // <div className="h-full w-full pt-10 px-5">
    //   <input
    //     className="p-2 mr-4 rounded-xl bg-gray-200 border-2 hover:border-black"
    //     type="text"
    //     placeholder="room name"
    //     onChange={(e) => setRoom(e.target.value)}
    //   />
    //   <button
    //     className="p-2 mr-10 rounded-xl bg-blue-300 text-blue-800"
    //     onClick={handleJoinRoom}
    //   >
    //     Join room
    //   </button>
    //   <input
    //     className="p-2 mr-4 rounded-xl bg-gray-200 border-2 hover:border-black"
    //     type="text"
    //     placeholder="message"
    //     onChange={(e) => setmessage(e.target.value)}
    //   />
    //   <button
    //     className="p-2 rounded-xl bg-blue-300 text-blue-800"
    //     onClick={handleSendMessage}
    //   >
    //     Send
    //   </button>
    //   <p className="font-bold">
    //     ID: <span className="font-normal">{id}</span>
    //   </p>
    //   <h1 className="font-bold">Messages</h1>
    //   <div className="pl-10">
    //     {messages.map((m, index) => (
    //       <li key={index}>
    //         {m.author} {m.message} {formatTime(m.time)}
    //       </li>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Home;
