import React from "react";

const ChatCard = ({ userImg, name, lastMessage }) => {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex items-center justify-center py-2 group cursor-pointer bg-white hover:bg-gray-100 transition duration-300 rounded-md shadow-md">
      <div className="w-[19%]">
        <img
          className="h-14 w-14 rounded-full object-cover"
          src={userImg}
          alt="profile"
        />
      </div>
      <div className="pl-5 w-[80%]">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-sm text-gray-500">
            {lastMessage ? formatTimestamp(lastMessage.timestamp) : ""}
          </p>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-gray-600 truncate">
            {lastMessage ? lastMessage.content : ""}
          </p>
          <div className="flex space-x-2">
            <span className="bg-green-500 h-2 w-2 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
