import React, { FormEvent, useEffect, useState } from "react";
import { socket } from "../login";
import Image from "next/image";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

type Message = {
  author: string;
  message: string;
  time: Date;
  room: string;
};

interface ChatWindowProps {
  selectedGroup: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedGroup }) => {
  const [room, setRoom] = useState("public");
  const [message, setmessage] = useState("");
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    const handleNewMessage = (data: Message) => {
      console.log(data);
      data.time = new Date(data.time);
      if (data.message != "") {
        setMessages((prevMessages) => {
          const currentRoomMessages = prevMessages[data.room] || [];
          return {
            ...prevMessages,
            [data.room]: [...currentRoomMessages, data],
          };
        });
      }
    };

    socket.on("message", handleNewMessage);

    return () => {
      // Remove the event listener to prevent duplicates
      socket.off("message", handleNewMessage);
    };
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      setRoom(selectedGroup);
      socket.emit("join-room", { username: username, room: selectedGroup });
    }
  }, [selectedGroup, username]);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent the form from refreshing the page
    socket.emit("send-message", {
      author: username,
      message: message,
      time: new Date(),
      room: room,
    });
    setmessage(""); // Clear the input text box
  };

  return (
    <div className="h-full w-2/3 flex flex-col">
      <div className="h-28 w-full bg-bgColor shadow-lg flex-shrink-0">
        <div className="container mx-auto flex items-center h-full justify-between px-4">
          <div>
            <p className="text-3xl font-roboto text-white font-medium">
              {selectedGroup}
            </p>
          </div>
          <div className="w-1/2 flex items-center relative">
            <input
              type="text"
              className="w-full h-12 rounded-2xl bg-borderColor pl-5 text-fontBgColor pr-10"
              placeholder="Search in this chat"
              name="search_user"
            />
            <div className="absolute right-0 top-0 h-full w-10 text-center text-gray-400 pointer-events-none flex items-center justify-center">
              <MagnifyingGlassIcon className="h-6 w-6 text-fontBgColor" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-bgColor h-full w-full pt-8 px-8 flex-grow overflow-auto">
        <div className="text-fontWhiteDarkBgColor pl-10">
          {(messages[selectedGroup] || []).map((m, index) => {
            const isCurrentUser = m.author === username;
            return (
              <div
                key={index}
                className={`flex items-start mb-2 ${
                  isCurrentUser ? "flex-row-reverse" : "flex-row -ml-12"
                }`}
              >
                <Image
                  src="/Frame_8.png"
                  alt=""
                  width={40}
                  height={40}
                  className={"ml-2"}
                />
                <div className={"ml-2"}>
                  <p
                    className={`font-semibold ${
                      isCurrentUser
                        ? "text-right text-fontWhiteDarkBgColor"
                        : "text-gray-800"
                    }`}
                  >
                    {isCurrentUser ? (
                      <>
                        <span className="text-fontBgColor text-sm ml-2">
                          {new Date(m.time).toLocaleTimeString()}
                        </span>
                        <span className="text-fontWhiteDarkBgColor text-sm ml-2">
                          {m.author}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-fontWhiteDarkBgColor text-sm">
                          {m.author}
                        </span>
                        <span className="text-fontBgColor text-sm ml-2">
                          {new Date(m.time).toLocaleTimeString()}
                        </span>
                      </>
                    )}
                  </p>
                  <div
                    className={`px-2 py-1 w-fit h-fit ${
                      isCurrentUser
                        ? "ml-auto bg-purple text-fontWhiteDarkBgColor rounded-lg rounded-tr-none rounded-br-lg"
                        : "bg-borderColor text-fontWhiteDarkBgColor rounded-lg rounded-bl-lg rounded-tl-none"
                    }`}
                  >
                    <div className="break-words max-w-[20ch]">
                      <span>{m.message}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-bgColor h-20 w-full p-5 flex-shrink-0 flex items-center">
        <form
          onSubmit={handleSendMessage}
          className="relative w-full flex-grow mr-4"
        >
          <input
            className="p-2 w-full rounded-xl bg-borderColor text-fontWhiteDarkBgColor hover:border-indigo-600 h-14"
            type="text"
            placeholder="Message..."
            value={message}
            onChange={(e) => setmessage(e.target.value)}
          />
          <button
            className="p-2 rounded-xl bg-purple text-white hover:bg-purple-500 flex items-center absolute right-2 top-2 h-10"
            type="submit"
          >
            <span>Send</span>
            <PaperAirplaneIcon className="h-6 w-6 text-white ml-2 -rotate-45" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
