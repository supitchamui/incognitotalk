import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Sidebar from "./Left-Sidebar/sidebar";
import ChatWindow from "./Chat-Window/chat-window";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import hashString from "@/utils/hashString";

const Home: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [isPrivate, setIsPrivate] = useState<any>(undefined);
  const handleGroupClick = (groupName: string, isprivate: any) => {
    setSelectedGroup(groupName);
    setShowChatWindow(true);
    setIsPrivate(isprivate);
  };
  const accountButtonRef = useRef<HTMLButtonElement | null>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      accountButtonRef.current &&
      !accountButtonRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push("/login");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="h-screen flex-col flex">
      <div className="bg-darkBgColor w-full h-[10%] items-center flex border-b border-borderColor">
        <div className="flex items-center mr-0 justify-between flex-row w-full">
          <div className="flex-row flex">
            <div className="ml-5">
              <Image src="/logo1.png" alt="" width={40} height={40}></Image>
            </div>
            <p className="ml-5 text-2xl font-lexend-deca text-white">
              INCOGNITOTALK
            </p>
          </div>

          <button
            ref={accountButtonRef}
            type="button"
            name="account"
            className="flex flex-row items-center hover:bg-bgColor p-2 rounded-2xl mr-3 transition duration-200"
            onClick={toggleDropdown}
          >
            <Image
              src={`/Frame_${
                username ? hashString(username as string) % 9 : 0
              }.png`}
              alt=""
              width={50}
              height={50}
            ></Image>
            <p className="ml-3 text-sm font-roboto text-white">{username}</p>
            <ChevronDownIcon className="h-4 w-4 text-fontWhiteDarkBgColor ml-4" />
          </button>
          {dropdownVisible && (
            <div
              ref={dropdownRef}
              className="bg-borderColor bg-opacity-80 text-white absolute mt-2 top-16 right-4 shadow-md py-2 px-4 rounded-md z-10 hover:bg-red-500 transition duration-200"
              onClick={toggleDropdown}
            >
              <button onClick={handleLogout} className="text-sm">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="h-[90%] flex-1 flex-row flex">
        <Sidebar
          onGroupClick={handleGroupClick}
          selectedGroup={selectedGroup}
        />
        {showChatWindow ? (
          <ChatWindow selectedGroup={selectedGroup} isPrivate={isPrivate} />
        ) : (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
