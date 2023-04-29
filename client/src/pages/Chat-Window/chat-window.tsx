import React, { FormEvent, useEffect, useState } from "react";
import { socket } from "../login";
import Image from "next/image";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { formatTime } from "@/utils/date";
import { MegaphoneIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export type Message = {
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
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<
    number | null
  >(null);
  const [announcement, setAnnouncement] = useState<string | null>(null);

  const [announcements, setAnnouncements] = useState<string[]>([]); // Add this line
  const [showAnnouncements, setShowAnnouncements] = useState(false); // Add this line

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    isCurrentUser: false,
    // index: -1,
  });

  const handleContextMenu = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    const isCurrentUser = messages[selectedGroup][index].author === username;
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      isCurrentUser,
    });
    setSelectedMessageIndex(index); // Set the selected message index
  };

  const hideContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  // const handleAnnounce = () => {
  //   if (selectedMessageIndex !== null) {
  //     const message = messages[selectedGroup][selectedMessageIndex];
  //     setAnnouncement(`${message.author}: ${message.message}`);
  //     setContextMenu({ ...contextMenu, visible: false });
  //   }
  // };

  const handleAnnounce = () => {
    if (selectedMessageIndex !== null) {
      const message = messages[selectedGroup][selectedMessageIndex];
      const newAnnouncement = `${message.author}: ${message.message}`;
      setAnnouncements((prev) => [newAnnouncement, ...prev]);
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  const toggleAnnouncements = () => {
    setShowAnnouncements((prev) => !prev);
  };

  const handleUnsendMessage = () => {
    if (selectedMessageIndex !== null) {
      setMessages((prevMessages) => {
        const currentRoomMessages = prevMessages[selectedGroup] || [];
        return {
          ...prevMessages,
          [selectedGroup]: [
            ...currentRoomMessages.slice(0, selectedMessageIndex),
            ...currentRoomMessages.slice(selectedMessageIndex + 1),
          ],
        };
      });
      setContextMenu({ ...contextMenu, visible: false });
      setSelectedMessageIndex(null);
    }
  };

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
      socket.emit("get-all-rooms");
      socket.emit("get-past-messages", { room: selectedGroup });
    }
  }, [selectedGroup, username]);

  useEffect(() => {
    const handlePastMessages = (data: Message[]) => {
      console.log(data);
      data.map((m) => {
        m.time = new Date(m.time);
      });
      setMessages((prevMessages) => {
        // Set past messages after join room first time
        if (!prevMessages[room]) {
          return {
            ...prevMessages,
            [room]: data,
          };
        } else {
          return { ...prevMessages };
        }
      });
    };
    socket.on("past-messages", handlePastMessages);
    return () => {
      socket.off("past-messages", handlePastMessages);
    };
  }, [room]);

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
    <div className="h-full w-2/3 flex flex-col" onClick={hideContextMenu}>
      <div className="h-20 w-full bg-bgColor border-b border-borderColor flex-shrink-0">
        <div className="container mx-auto flex justify-center items-center h-full">
          <div>
            <p className="text-3xl font-roboto text-white font-medium">
              {selectedGroup}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-bgColor h-full w-full flex-grow overflow-y-auto">
        {announcement && (
          <div className="bg-fontBgColor text-fontWhiteDarkBgColor py-2 px-4 w-[60%] fixed z-10 flex items-center justify-between">
            <div className="flex items-center">
              <MegaphoneIcon className="h-6 w-6 text-white-500" />
              <p className="ml-2">{announcement}</p>
            </div>
            <button
              className="focus:outline-none"
              onClick={toggleAnnouncements}
            >
              <ChevronDownIcon className="h-4 w-4 text-fontWhiteDarkBgColor" />
            </button>
            {/* {showAnnouncements && (
              <div className="absolute mt-2 top-14 right-0 w-[60%] z-10">
                {announcements.map((announce, index) => (
                  <div
                    key={index}
                    className="bg-fontBgColor text-fontWhiteDarkBgColor py-2 px-4 border-b border-fontWhiteDarkBgColor"
                  >
                    <p className="text-sm">{announce}</p>
                  </div>
                ))}
              </div>
            )} */}
          </div>
        )}

        <div>
          {(messages[selectedGroup] || []).map((m, index) => {
            const isCurrentUser = m.author === username;
            return (
              <div
                key={index}
                className={`flex items-start mb-2 ${
                  isCurrentUser ? "flex-row-reverse" : "flex-row -ml-4"
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
                          {formatTime(m.time)}
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
                          {formatTime(m.time)}
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
                    onContextMenu={(e) => handleContextMenu(e, index)}
                  >
                    <div className="break-words max-w-[20ch]">
                      <span>{m.message}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {contextMenu.visible && (
            <div
              className="fixed text-fontWhiteDarkBgColor p-2 bg-fontBgColor"
              style={{ top: contextMenu.y, left: contextMenu.x }}
            >
              {contextMenu.isCurrentUser && (
                <button
                  onClick={handleUnsendMessage}
                  className="cursor-pointer text-sm p-1 block w-full text-left"
                >
                  unsend
                </button>
              )}
              <button
                onClick={handleAnnounce}
                className={`cursor-pointer text-sm p-1 block w-full text-left ${
                  contextMenu.isCurrentUser ? "mt-1" : ""
                }`}
              >
                announce
              </button>
            </div>
          )}
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
