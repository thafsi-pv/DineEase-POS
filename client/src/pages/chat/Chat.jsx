import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:8080");
import { RiSendPlaneFill } from "react-icons/ri";

function chat() {
  const [messages, setMessages] = useState([]);
  console.log("🚀 ~ file: chat.jsx:8 ~ chat ~ messages:", messages);
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  console.log("🚀 ~ file: chat.jsx:10 ~ chat ~ recipient:", recipient);
  useEffect(() => {
    console.log("socketid", socket.id);
    socket.on("private message", ({ sender, message }) => {
      console.log("🚀 ~ file: chat.jsx:26 ~ socket.on ~ message:", message);
      console.log(`Private message from : ${message}`);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    // socket.on("private message", (msg) => {
    //   setMessages([...messages, msg]);
    // });
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // socket.emit("chat message", message);
    socket.emit("private message", { recipientt: socket.id, message });
    setMessage("");
  };

  socket.on("private message", ({ sender, message }) => {
    console.log("🚀 ~ file: chat.jsx:26 ~ socket.on ~ message:", message);
    console.log(`Private message from ${sender}: ${message}`);
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  return (
    <div className=" h-[75vh] flex bg-gray-100 rounded-lg mt-10 justify-center">
      <ContactList recipient={setRecipient} />
      <div className="flex-grow flex flex-col  items-center">
        <div className="h-full flex-grow md:w-2/3 sm:w-full flex  flex-col  ">
          <div className="overflow-y-auto p-4 flex-1">
            <ChatMessage message="Hey, how's it going?" isMine={false} />
            <ChatMessage
              message="I'm good, thanks! How about you?"
              isMine={true}
            />
            {messages.map((msg) => (
              <ChatMessage message={msg} isMine={true} />
            ))}
            {/* Add more messages here */}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 border rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="button"
              className="p-4 rounded-full border bg-white hover:bg-gray-400"
              onClick={handleSubmit}>
              <RiSendPlaneFill className="h-7 w-7 txtGreenColor" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default chat;

const ChatMessage = ({ message, isMine }) => {
  return (
    <div
      className={`flex ${
        isMine ? "justify-end" : "justify-start"
      } mb-4 items-end`}>
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isMine ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}>
        {message}
      </div>
    </div>
  );
};

const ContactList = ({ recipient }) => {
  const contacts = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
    // Add more contacts
  ];
  const [userList, setuserList] = useState([]);

  useEffect(() => {
    socket.emit("userList");
    socket.on("userList", (list) => {
      setuserList(list);
    });
  }, []);

  return (
    <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Contacts</h2>
      <ul>
        {Object.keys(userList).map((contact) => (
          <li
            onClick={() => recipient(contact)}
            key={contact}
            className="cursor-pointer py-2 hover:bg-gray-300">
            {contact}
          </li>
        ))}
      </ul>
    </div>
  );
};
