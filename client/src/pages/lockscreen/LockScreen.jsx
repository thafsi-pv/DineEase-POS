import React, { useEffect, useState } from "react";
import SignIn from "../auth/SignIn";
import LockWindow from "./components/LockWindow";

const LockScreen = ({ children }) => {
  // State to keep track of whether the screen should be locked
  const [isLocked, setIsLocked] = useState(false);
  console.log("🚀 ~ file: LockScreen.jsx:6 ~ LockScreen ~ isLocked:", isLocked);

  useEffect(() => {
    let inactivityTimer;

    // Event listener to detect user activity
    const handleUserActivity = () => {
      clearTimeout(inactivityTimer);
      setIsLocked(false);
      // Set the timer again after user activity
      inactivityTimer = setTimeout(() => {
        setIsLocked(true);
      }, 1000); // 1 minute in milliseconds
    };

    // Add event listeners on component mount
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("mousedown", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);
    document.addEventListener("touchstart", handleUserActivity);

    // Start the initial timer
    inactivityTimer = setTimeout(() => {
      setIsLocked(true);
    }, 30000); // 1 minute in milliseconds

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("mousedown", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
      document.removeEventListener("touchstart", handleUserActivity);
      clearTimeout(inactivityTimer);
    };
  }, []);

  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // After the component mounts, set isFading to true to trigger the fade-in animation.
    setIsFading(true);
  }, []);

  return (
    <div>
      {isLocked ? (
        // Render your lock screen here
        // <div
        //   className={`h-screen w-screen !z-[99] absolute flex justify-center items-center p-4 bg-blue-500 text-white font-bold transition-opacity overflow-hidden ${
        //     isFading ? "opacity-100" : "opacity-0"
        //   }`}>
        <div>
          <LockWindow/>
        </div>
      ) : (
        // Render your main content here
        <> {children}</>
      )}
    </div>
  );
};

export default LockScreen;
