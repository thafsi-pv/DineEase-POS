import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import io from "socket.io-client";
import incomingNotificationSound from "../../assets/sounds/incomingNotification.mp3";
import { Howl, Howler } from "howler";
import Card from "../../components/card";
Howler.volume(1);
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import chatbg from "../../assets/img/profile/chatbg.png";
import { BsFillEmojiSmileFill } from "react-icons/bs";
let data = JSON.parse(localStorage.getItem("DEPOS"));
let myUserName = data?.email;
const token = data?.DET;
const socket = io(`http://localhost:8080/?token=${token}`);
const sound = new Howl({
  src: [incomingNotificationSound],
});

function chat() {
  const chatListRef = useRef(null);
  //const [username, setUsername] = useState("");
  const [userList, setUserList] = useState([]);
  console.log("🚀 ~ file: Chat.jsx:23 ~ chat ~ userList:", userList);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmoji, setshowEmoji] = useState(false);

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
      const senderData = userList.find((user) => user.username == myUserName);
      const recipientData = userList.find(
        (user) => user.username == selectedRecipient
      );
      const newChat = {
        sender: senderData.userId,
        recipient: recipientData.userId,
        message,
      };
      createChat(newChat);
      setMessage("");
    }
  };

  const createChat = async (newChat) => {
    const data = await axios.post(
      "http://localhost:8080/api/chat/create",
      newChat
    );
    console.log("🚀 ~ file: Chat.jsx:70 ~ createChat ~ data:", data);
  };

  useEffect(() => {
    getChats();
  }, [selectedRecipient]);

  useEffect(() => {
    if (chatListRef && chatListRef.current) {
      chatListRef.current.scrollTo({
        top: chatListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useLayoutEffect(() => {
    if (chatListRef && chatListRef.current) {
      chatListRef.current.scrollTo({
        top: chatListRef.current.scrollHeight,
        behavior: "",
      });
    }
  }, []);

  const getChats = async () => {
    try {
      const senderData = userList.find((user) => user.username == myUserName);
      const recipientData = userList.find(
        (user) => user.username == selectedRecipient
      );
      const dt = { sender: senderData.userId, recipient: recipientData.userId };
      const data = await axios.post(
        "http://localhost:8080/api/chat/getChats",
        dt
      );

      const chats = data?.data.map((chat) => ({
        ...chat,
        sender: chat.sender.email,
        recipient: chat.recipient.email,
      }));
      setMessages(chats);
    } catch (error) {
      console.log("🚀 ~ file: Chat.jsx:89 ~ getChats ~ error:", error);
    }
  };

  const onEmojiClick = (event) => {
    setMessage((prev) => prev + event.emoji);
    setshowEmoji(false);
  };

  const getUserFirstName = () => {
    const user = userList.find((user) => {
      return user.username == selectedRecipient;
    });
    return user.firstName + " " + user.lastName;
  };

  return (
    <Card extra={"w-full h-full mt-3"}>
      <div
        className={`h-[75vh] flex bg-gray-200 dark:bg-navy-900 bg-cover bg-center  rounded-lg  justify-center`}
        style={{
          backgroundImage: `url(${chatbg})`,
          backgroundSize: "650px auto",
          backgroundRepeat: "repeat",
        }}>
        <ContactList userList={userList} recipient={setSelectedRecipient} />
        <div className="flex-grow flex">
          {selectedRecipient && (
            <div className="w-full flex-grow flex flex-col  items-center">
              <div className="bg-[#068e777f] w-full p-3 flex rounded-tr-lg bg-blend">
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="/src/assets/img/avatars/avatar4.png"
                    alt=""
                  />
                  <div className="flex flex-col  align-middle space-y-0">
                    <p className="font-semibold p-0">{getUserFirstName()}</p>
                    <p className="p-0 text-xs">Online</p>
                  </div>
                </div>
              </div>
              <div className=" h-1/3 flex-grow md:w-2/3 sm:w-full flex  flex-col  ">
                <div className="overflow-y-scroll p-4 flex-1" ref={chatListRef}>
                  {/* <ChatMessage message="Hey, how's it going?" isMine={false} />
              <ChatMessage
                message="I'm good, thanks! How about you?"
                isMine={true}
              /> */}
                  {messages.map((msg) => (
                    <ChatMessage
                      message={msg.message}
                      isMine={msg.sender == myUserName ? true : false}
                    />
                  ))}
                  {/* Add more messages here */}
                </div>
                <div className=" p-4 border-t flex items-center gap-2">
                  {showEmoji && (
                    <div className="absolute bottom-24">
                      <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        disableAutoFocus={true}
                        native
                      />
                    </div>
                  )}
                  <BsFillEmojiSmileFill
                    className="h-7 w-7 txtGreenColor"
                    onClick={() => setshowEmoji(true)}
                  />
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full p-4 border rounded-md flex-1"
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
          )}
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
      } mb-4 items-end `}>
      <div
        className={`max-w-xs p-3  whitespace-normal break-all ${
          isMine
            ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
            : "bg-gray-300 rounded-r-lg rounded-tl-lg"
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
    <div className="w-1/4 bg-white dark:bg-navy-900">
      <div className=" border-gray-400 bg-[#068e774d] rounded-tl-lg ">
        <p className="text-left p-4 text-lg font-semibold">DE Chats</p>
      </div>
      <div className="  p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Contacts</h2>
        <ul>
          {list.map((user) => (
            <li
              onClick={() => recipient(user.username)}
              key={user.userId}
              className="cursor-pointer py-2 hover:bg-gray-300 hover:rounded-lg">
              <div className="">
                <div className="flex items-center p-1">
                  <div className="relative">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="/src/assets/img/avatars/avatar4.png"
                      alt=""
                    />
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${user.isOnline?'bg-green-500':'bg-red-500'} bg-green-500 border shadow-lg`}>
                    </span>
                  </div>
                  <p className="p-2 font-semibold">
                    {user.firstName + " " + user.lastName}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
