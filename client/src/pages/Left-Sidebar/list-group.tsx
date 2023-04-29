import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { socket } from "../login";
import { Message } from "../Chat-Window/chat-window";
import { useRouter } from "next/router";

interface Group {
  groupName: string;
  people: number;
}

interface ChatGroupsProps {
  onGroupClick: (groupName: string) => void;
  selectedGroup: string;
}

type RoomDetails = {
  room: string;
  userCount: number;
  latestMessage: Message;
};

const Groups: React.FC<ChatGroupsProps> = ({ onGroupClick, selectedGroup }) => {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    socket.emit("get-all-rooms");
  }, []);

  useEffect(() => {
    const groupListener = (data: RoomDetails[]) => {
      const allGroup: Group[] = [];
      data.map((room) => {
        const group: Group = { groupName: room.room, people: room.userCount };
        allGroup.push(group);
      });
      setGroupList(allGroup);
    };

    socket.on("rooms", groupListener);
    return () => {
      socket.off("rooms", groupListener);
    };
  }, []);

  const handleCreateGroup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const groupName = e.currentTarget.elements.namedItem(
      "group_name"
    ) as HTMLInputElement;
    if (groupName) {
      socket.emit("join-room", { username: username, room: groupName.value });
    }
    socket.emit("get-all-rooms");
    groupName.value = "";
  };

  return (
    <div className="bg-bgColor w-1/3 border-r border-borderColor">
      <div className="h-35 w-full border-b border-borderColor items-center flex justify-center flex-col">
        <div className="w-4/5">
          <input
            type="text"
            className="w-full h-12 rounded-2xl bg-borderColor pl-5 text-white mt-4"
            placeholder="Search"
            name="search_user"
          />
        </div>
        <form
          className="w-11/12 items-center flex justify-center"
          onSubmit={handleCreateGroup}
        >
          <input
            type="text"
            className="w-full h-12 rounded-2xl bg-borderColor pl-5 text-white mt-3 mb-4"
            placeholder="Enter Group Name"
            name="group_name"
          />
          <button
            type="submit"
            name="all-chats"
            className="w-20 h-12 rounded-xl text-white ml-2 bg-purple"
          >
            Create
          </button>
        </form>
      </div>
      {groupList.map((group, index) => (
        <div
          key={index}
          className={`h-28 w-full border-b border-borderColor items-center flex cursor-pointer ${
            group.groupName === selectedGroup ? "bg-purple-400" : ""
          }`}
          onClick={() => {
            onGroupClick(group.groupName);
            console.log(group.groupName);
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
            <p
              className={`text-white text-xl ${
                group.groupName === selectedGroup ? "font-bold" : ""
              }`}
            >
              {`${group.groupName} (${group.people})`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Groups;
