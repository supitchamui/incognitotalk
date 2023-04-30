import Image from "next/image";
import React, { useEffect, useState } from "react";
import { socket } from "../login";
import { useRouter } from "next/router";
import { formatRoomName } from "@/utils/private_chat";

interface ChatFriendsProps {
  onGroupClick: (GroupName: string) => void;
}

const Friends: React.FC<ChatFriendsProps> = ({ onGroupClick }) => {
  const [friendList, setFriendList] = useState<string[]>([]);
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    socket.emit("get-all-users");
  }, []);

  useEffect(() => {
    const friendListener = (data: string[]) => {
      const allUsers = data;
      if (username !== undefined && typeof username === "string") {
        const currentUser = data.indexOf(username);
        if (currentUser !== -1) {
          allUsers.splice(currentUser, 1);
        }
      }
      setFriendList(data);
    };
    socket.on("users", friendListener);
    return () => {
      socket.off("users", friendListener);
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
      {friendList.map((friend, index) => {
        return (
          <div
            className="h-28 w-full border-b border-borderColor items-center flex cursor-pointer"
            key={index}
            onClick={() => {
              onGroupClick(formatRoomName(username as string, friend));
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
              <p className="text-white text-xl">{friend}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Friends;
