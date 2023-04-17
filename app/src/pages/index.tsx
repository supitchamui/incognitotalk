import { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000", { transports: ["websocket"] });

type Message = {
  author: string;
  message: string;
};

const Home = () => {
  const [message, setmessage] = useState("");
  const [id, setId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    socket.emit("send message", { author: id, message: message });
  };

  socket.on("userId", (data) => {
    setId(data);
  });
  socket.on("message", (data) => {
    if (messages.length == 0) {
      setMessages([data]);
    } else {
      setMessages([...messages, data]);
    }
  });

  return (
    <div className="h-full w-full pt-10 px-5">
      <input
        className="p-2 mr-4 rounded-xl bg-gray-200 border-2 hover:border-black"
        type="text"
        onChange={(e) => setmessage(e.target.value)}
      />
      <button
        className="p-2 rounded-xl bg-blue-300 text-blue-800"
        onClick={handleSendMessage}
      >
        Send
      </button>
      <p className="font-bold">
        ID: <span className="font-normal">{id}</span>
      </p>
      <h1 className="font-bold">Messages</h1>
      <div className="pl-10">
        {messages.map((m, index) => (
          <li key={index}>
            {m.author} {m.message}
          </li>
        ))}
      </div>
    </div>
  );
};

export default Home;
