import React from 'react';
import { useSelector } from 'react-redux';
import { getMessages } from '../../state/messages/selectors';
import { Message } from 'semantic-ui-react';

import classes from "./MessageList.module.css";

export function MessageList() {
  const messages = useSelector(getMessages)

  return (
    <div className={classes.messageList}>
      {messages.map(message =>
        <Message info key={message.id}>{message.text}</Message>
      )}
    </div>
  )
}


