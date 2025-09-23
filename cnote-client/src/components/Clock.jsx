import React, { useState, useEffect } from "react";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setCurrentTime(new Date());

    const now = new Date();
    const secondsUntilNextMinute = 60 - now.getSeconds();

    const initialTimeout = setTimeout(() => {
      setCurrentTime(new Date());

      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000);

      return () => clearInterval(timer);
    }, secondsUntilNextMinute * 1000);

    return () => clearTimeout(initialTimeout);
  }, []);

  const formatDate = (date) => {
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();

    return `${weekday}, ${day} ${month} ${year}`;
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const formattedHours = hours.toString().padStart(2, "0");

    return `${formattedHours}:${minutes} ${ampm}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg shadow-lg border border-gray-700 min-w-fit">
      <div className="text-gray-300 text-lg font-medium mb-2 tracking-wide">
        {formatDate(currentTime)}
      </div>
      <div className="text-white text-4xl font-light tracking-wider font-mono">
        {formatTime(currentTime)}
      </div>
    </div>
  );
}
