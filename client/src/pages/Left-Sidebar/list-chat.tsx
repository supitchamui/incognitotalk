import React from "react";
import Image from "next/image";

interface Chat {
  name: string;
  message: string;
}

const chatList: Chat[] = [
  {
    name: "Someone",
    message: "Past Message",
  },
  {
    name: "Someone Else",
    message: "Another Past Message",
  },
  // Add more chat items here
];

const Chats = () => {
  return (
    <div className="bg-bgColor w-1/3 border-r border-borderColor">
      <div className="h-28 w-full border-b border-borderColor items-center flex justify-center">
        <div className="w-4/5">
          <input
            type="text"
            className="w-full h-12 rounded-2xl bg-borderColor pl-5 text-white"
            placeholder="Search"
            name="search_user"
          />
        </div>
      </div>
      {chatList.map((chat, index) => (
        <div
          key={index}
          className={`h-28 w-full border-b border-borderColor items-center flex cursor-pointer bg-blue-400}`}
          onClick={() => {
            console.log(chat.name);
          }}
        >
          <Image
            src="/Frame_8.png"
            alt=""
            width={75}
            height={50}
            className="ml-6"
          ></Image>
          <div className="font-roboto ml-6">
            <p className={`text-white text-xl mt-2 font-bold}`}>{chat.name}</p>
            <p className={`text-fontBgColor text-base mt-2}`}>{chat.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Chats;
