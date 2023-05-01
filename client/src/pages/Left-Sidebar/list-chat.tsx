import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { socket } from "../login";
import { RoomDetails } from "./list-group";
import { formatRoomName, getFriendName } from "@/utils/private_chat";
import hashString from "@/utils/hashString";

interface Chat {
  name: string;
  message: string;
  isPrivate: any;
  groupName: any;
}

interface allChatsProps {
  onGroupClick: (groupName: string, isprivate: any) => void;
}

const Chats: React.FC<allChatsProps> = ({ onGroupClick }) => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    socket.emit("get-user-rooms", { username: username });
  }, [username]);

  useEffect(() => {
    const chatListener = (data: RoomDetails[]) => {
      const chats: Chat[] = [];
      data.map((room) => {
        let chatName = "";
        if (room.private) {
          chatName =
            username !== undefined && typeof username === "string"
              ? getFriendName(username, room.room)
              : "";
        } else {
          chatName = `${room.room} (${room.userCount})`;
        }
        const chat: Chat = {
          name: chatName,
          message: room.latestMessage.message,
          isPrivate: room.private,
          groupName: room.private
            ? getFriendName(username as string, room.room)
            : room.room,
        };
        chats.push(chat);
      });
      setChatList(chats);
    };
    socket.on("user-rooms", chatListener);

    return () => {
      socket.off("user-rooms", chatListener);
    };
  }, [username]);

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
            onGroupClick(
              chat.isPrivate
                ? formatRoomName(username as string, chat.name)
                : chat.groupName,
              chat.isPrivate
            );
          }}
        >
          <Image
            src={`/${chat.name.includes("(") ? "G" : "Frame_"}${
              chat.name ? hashString(chat.name.split(" (")[0] as string) % 9 : 0
            }.png`}
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
