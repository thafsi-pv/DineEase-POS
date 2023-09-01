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
    let data = JSON.parse(localStorage.getItem("DEPOS"));
    console.log("🚀 ~ file: chat.jsx:16 ~ useEffect ~ data:", data);

    socket.emit("login", data.email);
    socket.on("userList", (list) => {
      setUserList(list);
    });

    socket.on("private message", ({ sender, message }) => {
      setMessages((prevMessages) => [...prevMessages, `${sender}: ${message}`]);
    });
  }, []);

  // const handleLogin = () => {
  //   socket.emit("login", username);
  // };

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
    <div className=" h-[75vh] flex bg-gray-100 rounded-lg mt-10 justify-center">
      <ContactList userList={userList} recipient={setSelectedRecipient} />
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
              onClick={handleSendMessage}>
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

const ContactList = ({ userList, recipient }) => {
  
  //const [userList, setuserList] = useState([]);

  return (
    <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Contacts</h2>
      <ul>
        {userList.map((user) => (
          <li
          onClick={() => recipient(user)}
            key={user}
            className="cursor-pointer py-2 hover:bg-gray-300">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

// function chat() {
//   const [username, setUsername] = useState("");
//   const [userList, setUserList] = useState([]);
//   const [selectedRecipient, setSelectedRecipient] = useState("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on("userList", (list) => {
//       setUserList(list);
//     });

//     socket.on("private message", ({ sender, message }) => {
//       setMessages((prevMessages) => [...prevMessages, `${sender}: ${message}`]);
//     });
//   }, []);

//   const handleLogin = () => {
//     socket.emit("login", username);
//   };

//   const handleSendMessage = () => {
//     if (selectedRecipient && message) {
//       socket.emit("private message", { recipient: selectedRecipient, message });
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         `You to ${selectedRecipient}: ${message}`,
//       ]);
//       setMessage("");
//     }
//   };
//   return (
//     <div>
//       <h1>Private Chat</h1>
//       <div>
//         <label>Username: </label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <button onClick={handleLogin}>Login</button>
//       </div>
//       <div>
//         <h2>Online Users</h2>
//         <ul>
//           {userList.map((user) => (
//             <li
//               key={user}
//               onClick={() => setSelectedRecipient(user)}
//               style={{
//                 cursor: "pointer",
//                 fontWeight: selectedRecipient === user ? "bold" : "normal",
//               }}>
//               {user}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2>Chat</h2>
//         <div style={{ border: "1px solid #ccc", padding: "10px" }}>
//           {messages.map((msg, index) => (
//             <div key={index}>{msg}</div>
//           ))}
//         </div>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }
// export default chat;
