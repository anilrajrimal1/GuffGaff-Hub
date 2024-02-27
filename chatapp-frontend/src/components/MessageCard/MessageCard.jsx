import React from 'react';

const MessageCard = ({ customKey, isReqUserMessage, content }) => {
  return (
    <div key={customKey} className={`py-2 px-2 rounded-md mx-w-[50%] ${isReqUserMessage ? "self-start bg-white" : "self-end bg-[#d3fdd3]"}`}>
      <p>
        {content}
      </p>
    </div>
  );
};

export default MessageCard;
