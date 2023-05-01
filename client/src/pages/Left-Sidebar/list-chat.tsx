import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { socket } from "../login";
import { RoomDetails } from "./list-group";
import { getFriendName } from "@/utils/private_chat";
import ChatItem from "../Component/chat";

export interface Chat {
  roomName: string;
  name: string;
  message: string;
  isPrivate: any;
  pin: boolean;
}

interface allChatsProps {
  onGroupClick: (groupName: string, isprivate: any) => void;
}

const Chats: React.FC<allChatsProps> = ({ onGroupClick }) => {
  const [likedList, setLikedList] = useState<String[]>([]);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const router = useRouter();
  const { username } = router.query;

  const customSort = (a: JSX.Element, b: JSX.Element) => {
    const aIndex = likedList.indexOf(a.props.chat.name);
    const bIndex = likedList.indexOf(b.props.chat.name);
    if (aIndex !== -1 && bIndex !== -1) {
      return bIndex - aIndex;
    } else if (aIndex !== -1) {
      return -1;
    } else if (bIndex !== -1) {
      return 1;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    socket.emit("get-user-rooms", { username: username });
  }, [username]);

  useEffect(() => {
    const chatListener = (data: { room: RoomDetails; pin: boolean }[]) => {
      const chats: Chat[] = [];
      const pinList: string[] = [];
      data.map((roomDetails) => {
        let chatName = "";
        if (roomDetails.room.private) {
          chatName =
            username !== undefined && typeof username === "string"
              ? getFriendName(username, roomDetails.room.room)
              : "";
        } else {
          chatName = `${roomDetails.room.room} (${roomDetails.room.userCount})`;
        }
        const chat: Chat = {
          roomName: roomDetails.room.room,
          name: chatName,
          message: roomDetails.room.latestMessage.message,
          isPrivate: roomDetails.room.private,
          pin: roomDetails.pin,
        };
        if (roomDetails.pin) {
          pinList.push(chatName);
        }
        chats.push(chat);
      });
      setChatList(chats);
      setLikedList(pinList);
    };
    socket.on("user-rooms", chatListener);

    return () => {
      socket.off("user-rooms", chatListener);
    };
  }, [username]);

  return (
    <div className="bg-bgColor w-1/3 border-r border-borderColor">
      <div className="h-[20%] w-full border-b border-borderColor items-center flex justify-center">
        <div className="w-4/5">
          <input
            type="text"
            className="w-full h-12 rounded-2xl bg-borderColor pl-5 text-white"
            placeholder="Search"
            name="search_user"
          />
        </div>
      </div>
      <div className="h-[80%] overflow-y-auto">
        {chatList
          .map((chat, index) => (
            <ChatItem
              key={index}
              chat={chat}
              setLikedList={setLikedList}
              onGroupClick={onGroupClick}
            />
          ))
          .sort(customSort)}
      </div>
    </div>
  );
};
export default Chats;
