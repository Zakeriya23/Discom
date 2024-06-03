import React from 'react';
import "./App.css";

export default function Profile({ userId, username, online }) {
  const colors = [
    'teal-avatar', 'red-avatar', 'green-avatar', 'purple-avatar',
    'blue-avatar', 'yellow-avatar', 'orange-avatar', 'pink-avatar',
    'fuchsia-avatar', 'rose-avatar'
  ];
  const userIdBase10 = parseInt(userId.substring(10), 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];

  return (
    <div className={`avatar ${color}`}>
      <div className="avatar-initial">{username[0]}</div>
      {online && (
        <div className="online-indicator"></div>
      )}
      {!online && (
        <div className="offline-indicator"></div>
      )}
    </div>
  );
}
