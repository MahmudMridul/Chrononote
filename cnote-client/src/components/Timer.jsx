import React, { useState, useEffect, useRef } from "react";

export default function Timer() {
  const [timerName, setTimerName] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5); // Default 5 minutes
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            setIsTimeUp(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const generateTimerName = (h, m, s) => {
    const parts = [];
    if (h > 0)
      parts.push(`${h.toString().padStart(2, "0")} hour${h !== 1 ? "s" : ""}`);
    if (m > 0)
      parts.push(`${m.toString().padStart(2, "0")} min${m !== 1 ? "s" : ""}`);
    if (s > 0)
      parts.push(`${s.toString().padStart(2, "0")} sec${s !== 1 ? "s" : ""}`);
    return parts.join(" ");
  };

  const getDisplayName = () => {
    if (timerName.trim()) {
      return timerName.trim();
    }
    if (timeLeft > 0 || hours + minutes + seconds > 0) {
      return generateTimerName(hours, minutes, seconds);
    }
    return "";
  };

  const handleStart = () => {
    if (timeLeft === 0) {
      // Set new timer from input values
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      if (totalSeconds > 0) {
        setTimeLeft(totalSeconds);
        setIsRunning(true);
        setIsTimeUp(false);
      }
    } else {
      // Resume existing timer
      setIsRunning(true);
      setIsTimeUp(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setIsTimeUp(false);
  };

  const handleInputChange = (type, value) => {
    const numValue = Math.max(0, Math.min(99, parseInt(value) || 0));
    if (type === "hours") setHours(numValue);
    if (type === "minutes") setMinutes(Math.min(59, numValue));
    if (type === "seconds") setSeconds(Math.min(59, numValue));
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-900 rounded-lg shadow-lg border border-gray-700 min-w-fit max-w-md">
      {/* Timer Name Input - Only show when timer is not active */}
      {timeLeft === 0 && (
        <div className="w-full mb-6">
          <input
            type="text"
            placeholder="Timer name (optional)"
            value={timerName}
            onChange={(e) => setTimerName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {/* Timer Name Display */}
      {getDisplayName() && (
        <div className="text-gray-300 text-lg font-medium mb-4 text-center">
          {getDisplayName()}
        </div>
      )}

      {/* Timer Display */}
      <div
        className={`text-5xl font-mono font-light tracking-wider mb-6 ${
          isTimeUp ? "text-red-400" : "text-white"
        }`}
      >
        {timeLeft > 0
          ? formatTime(timeLeft)
          : formatTime(hours * 3600 + minutes * 60 + seconds)}
      </div>

      {/* Time Up Notification */}
      {isTimeUp && (
        <div className="text-red-400 text-xl font-semibold mb-4 animate-pulse">
          Time's Up!
        </div>
      )}

      {/* Time Input Fields (only show when timer is not set or stopped) */}
      {timeLeft === 0 && (
        <div className="flex gap-2 mb-6">
          <div className="flex flex-col items-center">
            <label className="text-gray-400 text-sm mb-1">Hours</label>
            <input
              type="number"
              min="0"
              max="99"
              value={hours}
              onChange={(e) => handleInputChange("hours", e.target.value)}
              className="w-16 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-gray-400 text-sm mb-1">Minutes</label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => handleInputChange("minutes", e.target.value)}
              className="w-16 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-gray-400 text-sm mb-1">Seconds</label>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => handleInputChange("seconds", e.target.value)}
              className="w-16 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            disabled={timeLeft === 0 && hours + minutes + seconds === 0}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Stop
          </button>
        )}

        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
