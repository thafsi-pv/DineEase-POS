import React, { useEffect, useRef, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

import io from "socket.io-client";

const socket = io("http://localhost:8080");

function chat() {
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("userList", (list) => {
      setUserList(list);
    });

    socket.on("private message", ({ sender, message }) => {
      setMessages((prevMessages) => [...prevMessages, `${sender}: ${message}`]);
    });
  }, []);

  const handleLogin = () => {
    socket.emit("login", username);
  };

  const handleSendMessage = () => {
    if (selectedRecipient && message) {
      socket.emit("private message", { recipient: selectedRecipient, message });
      setMessages((prevMessages) => [
        ...prevMessages,
        `You to ${selectedRecipient}: ${message}`,
      ]);
      setMessage("");
    }
  };
  return (
    <div>
      <h1>Private Chat</h1>
      <div>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <h2>Online Users</h2>
        <ul>
          {userList.map((user) => (
            <li
              key={user}
              onClick={() => setSelectedRecipient(user)}
              style={{
                cursor: "pointer",
                fontWeight: selectedRecipient === user ? "bold" : "normal",
              }}>
              {user}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Chat</h2>
        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
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
