import React from 'react';
import styles from './MessageCard.module.css'; // Import your external CSS file

const MessageCard = ({ customKey, isReqUserMessage, content }) => {
  return (
    <div
      key={customKey}
      className={`py-2 px-3 ${styles.messageCard} ${
        isReqUserMessage ? styles.sender : styles.receiver
      }`}
    >
      <p className={styles.messageText}>{content}</p>
    </div>
  );
};

export default MessageCard;
