import React, { useEffect, useRef, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import io from "socket.io-client";
import incomingNotificationSound from "../../assets/sounds/incomingNotification.mp3";
import { Howl, Howler } from "howler";
import Card from "../../components/card";
Howler.volume(1);

let data = JSON.parse(localStorage.getItem("DEPOS"));
let myUserName = data?.email;
const token = data?.DET;
const socket = io(`http://localhost:8080/?token=${token}`);
const sound = new Howl({
  src: [incomingNotificationSound],
});

function chat() {
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("login", myUserName);
    socket.on("userList", (list) => {
      setUserList(list);
    });

    socket.on("private message", ({ sender, message }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: sender, message: message },
      ]);
      sound.play();
    });
  }, []);

  // const handleLogin = () => {
  //   socket.emit("login", username);
  // };

  const handleSendMessage = () => {
    if (selectedRecipient && message) {
      socket.emit("private message", {
        sender: myUserName,
        recipient: selectedRecipient,
        message,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: myUserName, recipient: selectedRecipient, message: message },
      ]);

      setMessage("");
    }
  };

  return (
    <Card extra={"w-full h-full p-3 pt-4"}>
      <div className=" h-[75vh] flex bg-gray-100 rounded-lg  justify-center">
        <ContactList userList={userList} recipient={setSelectedRecipient} />
        <div className="flex-grow flex flex-col  items-center">
          <div className="bg-green-200 w-full p-3 flex">
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full"
                src="/src/assets/img/avatars/avatar4.png"
                alt=""
              />
              <p className="p-2 font-semibold">{selectedRecipient}</p>
            </div>
          </div>
          <div className="h-full flex-grow md:w-2/3 sm:w-full flex  flex-col  ">
            <div className="overflow-y-auto p-4 flex-1">
              <ChatMessage message="Hey, how's it going?" isMine={false} />
              <ChatMessage
                message="I'm good, thanks! How about you?"
                isMine={true}
              />
              {messages.map((msg) => (
                <ChatMessage
                  message={msg.message}
                  isMine={msg.sender == myUserName ? true : false}
                />
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
                onClick={handleSendMessage}>
                <RiSendPlaneFill className="h-7 w-7 txtGreenColor" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
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
        className={`max-w-xs p-3 rounded-lg whitespace-normal break-all ${
          isMine ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}>
        {message}
      </div>
    </div>
  );
};

const ContactList = ({ userList, recipient }) => {
  //const [userList, setuserList] = useState([]);
  const list = userList.filter((item) => item.username != myUserName);
  return (
    <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Contacts</h2>
      <ul>
        {list.map((user) => (
          <li
            onClick={() => recipient(user.username)}
            key={user.userId}
            className="cursor-pointer py-2 hover:bg-gray-300">
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};
