import React from "react";

export default function Watch() {
  return (
    <div className="text-center">
      <div className="text-6xl font-mono text-white mb-4">
        {new Date().toLocaleTimeString()}
      </div>
      <p className="text-gray-400">Current time display</p>
    </div>
  );
}
