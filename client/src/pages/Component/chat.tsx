import hashString from "@/utils/hashString";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Chat } from "../Left-Sidebar/list-chat";
import { useRouter } from "next/router";
import { formatRoomName } from "@/utils/private_chat";

interface GroupItemProps {
  chat: Chat;
  setLikedList: React.Dispatch<React.SetStateAction<String[]>>;
  onGroupClick: (groupName: string, isPrivate: boolean) => void;
}

const ChatItem: React.FC<GroupItemProps> = ({
  chat,
  setLikedList,
  onGroupClick,
}) => {
  const [isHeartActive, setIsHeartActive] = useState(false);
  const router = useRouter();
  const { username } = router.query;

  const handleHeartClick = () => {
    if (isHeartActive) {
      setIsHeartActive(false);
      setLikedList((prev) => prev.filter((item) => item !== chat.name));
    } else {
      setIsHeartActive(true);
      setLikedList((prev) => [...prev, chat.name]);
      //console.log(chat.name);
    }
  };

  return (
    <div className="h-28 w-full items-center flex cursor-pointer border-b border-borderColor">
      <div
        className={`h-28 w-full items-center flex cursor-pointer bg-blue-400}`}
        onClick={() => {
          console.log(chat.name);
          const name = chat.isPrivate
            ? formatRoomName(username as string, chat.name)
            : chat.groupName;
          onGroupClick(name, chat.isPrivate);
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
      <div className="ml-auto mr-6">
        {isHeartActive ? (
          <HeartIconSolid
            className="h-8 w-8 text-purple "
            onClick={handleHeartClick}
          />
        ) : (
          <HeartIcon
            className="h-8 w-8 text-gray-500"
            onClick={handleHeartClick}
          />
        )}
      </div>
    </div>
  );
};

export default ChatItem;
