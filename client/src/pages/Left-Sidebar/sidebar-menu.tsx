//setค่าเพื่อส่งคืนที่ sidebar

type SidebarMenuProps = {
  setPage: (page: string) => void;
  currentPage: string;
};

import {
  ChatBubbleOvalLeftEllipsisIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const SidebarMenu = ({ setPage, currentPage }: SidebarMenuProps) => {
  const [room, setRoom] = useState("all-chats");
  return (
    <div className="bg-darkBgColor w-28 items-center flex text-white flex-col justify-end font-roboto">
      <div className="mb-8">
        <button
          type="button"
          name="friends"
          className={`flex flex-col items-center justify-center w-20 h-20 rounded-xl hover:bg-bgColor ${
            room === "friends" ? "text-purple" : ""
          } transition duration-250`}
          onClick={() => {
            setPage("friends");
            setRoom("friends");
            console.log("friends");
          }}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8" />
          <span className="text-sm font-medium">Online</span>
        </button>
      </div>
      <div className="mb-8">
        <button
          type="button"
          name="groups"
          className={`flex flex-col items-center justify-center w-20 h-20 rounded-xl hover:bg-bgColor ${
            room === "groups" ? "text-purple" : ""
          } transition duration-250`}
          onClick={() => {
            setPage("groups");
            setRoom("groups");
            console.log("groups");
          }}
        >
          <UserGroupIcon className="h-8 w-8" />
          <span className="text-sm font-medium">Groups</span>
        </button>
      </div>

      <div className="mb-12">
        <button
          type="button"
          name="all-chats"
          className={`flex flex-col items-center justify-center w-20 h-20 rounded-xl hover:bg-bgColor ${
            room === "all-chats" ? "text-purple" : ""
          } transition duration-250`}
          onClick={() => {
            setPage("all-chats");
            setRoom("all-chats");
            console.log("all-chats");
          }}
        >
          <UserIcon className="h-8 w-8" />
          <span className="text-sm font-medium">Friends</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;
