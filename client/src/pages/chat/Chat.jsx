import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { RiSendPlaneFill } from "react-icons/ri";

function chat() {
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();

  // Connect to Socket.io
  useEffect(() => {
    console.log("useeffect running");
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", "123User");
    socket.current.on("get-users", (users) => {
      console.log("🚀 ~ file: chat.jsx:18 ~ socket.current.on ~ users:", users);
      setOnlineUsers(users);
    });
  }, []);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  return (
    <div className=" h-[75vh] flex bg-gray-100 rounded-lg mt-10 justify-center">
      <ContactList recipient={setOnlineUsers} />
      <div className="flex-grow flex flex-col  items-center">
        <div className="h-full flex-grow md:w-2/3 sm:w-full flex  flex-col  ">
          <div className="overflow-y-auto p-4 flex-1">
            <ChatMessage message="Hey, how's it going?" isMine={false} />
            <ChatMessage
              message="I'm good, thanks! How about you?"
              isMine={true}
            />
            {chats.map((msg) => (
              <ChatMessage message={msg} isMine={true} />
            ))}
            {/* Add more messages here */}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 border rounded-md"
              value={currentChat}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="button"
              className="p-4 rounded-full border bg-white hover:bg-gray-400"
              onClick={sendMessage}>
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
