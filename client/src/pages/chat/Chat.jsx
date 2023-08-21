import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
const socket = io('http://localhost:8080');

function chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("chat message", message);
    setMessage("");
  };

  return (
    <div className=" h-[75vh] flex bg-gray-100 rounded-lg mt-10 justify-center">
      <ContactList />
      <div className="flex-grow flex flex-col bg-green-200">
        <div className="overflow-y-auto p-4 flex-1">
          <ChatMessage message="Hey, how's it going?" isMine={false} />
          <ChatMessage
            message="I'm good, thanks! How about you?"
            isMine={true}
          />
          <ChatMessage message="OKAY" isMine={false} />
          <ChatMessage message="thanks! " isMine={true} />
          {/* Add more messages here */}
        </div>
        <div className="bg-white p-4 border-t">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 border rounded-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="button" onClick={handleSubmit}>
            Send
          </button>
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

const ContactList = () => {
  const contacts = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
    // Add more contacts
  ];

  return (
    <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="cursor-pointer py-2 hover:bg-gray-300">
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
